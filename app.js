import { checkUpdateVersion, getDateWithDiffHours } from './utils/utils';
import { app_version } from "./config";

App({
  onLaunch() {
    // 检查版本
    checkUpdateVersion();

    // 清理缓存
    this.clearCache();

    // 启动时尝试获取定位。  这确保了在App启动时就尝试获取位置。
    this.getAndSetLocation();

    this.globalData = {
      version: app_version,
      latitude: null, // 初始化为 null，表示尚未获取
      longitude: null, // 初始化为 null，表示尚未获取
      address: '正在定位...'
    };
  },
  onShow() {
    // 每次小程序从后台进入前台时也尝试定位，确保位置信息是最新的
    this.getAndSetLocation();
  },

  // 将获取定位和设置全局数据合并成一个函数
  getAndSetLocation: function() {
    wx.getSetting({
      success: (res) => {
        // 检查用户是否已经授权了地理位置权限
        if (res.authSetting['scope.userLocation'] === false) {
          // 用户之前拒绝了授权。  直接显示提示。
          this.showLocationAuthDeniedModal();
        } else {
          // 用户已经授权或者从未授权，尝试获取模糊定位
          this.getFuzzyLocation();
        }
      },
      fail: (err) => {
        console.error("获取设置失败", err);
        this.setGlobalLocation(null, null, '获取设置失败，请稍后重试');
        wx.showToast({
          title: '获取设置失败',
          icon: 'none',
          duration: 2000,
        });
      }
    });
  },

  getFuzzyLocation: function() {
    wx.getFuzzyLocation({
      type: 'wgs84',
      success: (res) => {
        console.log("模糊定位信息:", res);
        const latitude = res.latitude;
        const longitude = res.longitude;

        // 反向地理编码获取地址信息
        this.reverseGeocode(latitude, longitude);  // 调用反向地理编码函数

      },
      fail: (err) => {
        console.error("获取模糊定位失败:", err);
        if (err.errMsg === "getLocation:fail auth deny" || err.errMsg === "getLocation:fail:auth denied" || err.errMsg.indexOf("auth deny") > -1) {
          // 用户拒绝授权
          this.showLocationAuthDeniedModal(); // 使用统一的处理函数
        } else {
          // 其他定位失败原因
          this.setGlobalLocation(null, null, '定位失败: ' + err.errMsg); // 将 latitude 和 longitude 设置为 null
          wx.showToast({
            title: '定位失败',
            icon: 'none',
            duration: 2000
          });
        }
      }
    });
  },

  reverseGeocode: function(latitude, longitude) {
    wx.request({
      url: 'https://api.map.baidu.com/reverse_geocoding/v3/?ak=yD4QTRV3pxnhcVmTsZiQWsPw1yxb1qgv&output=json&coordtype=wgs84ll&location=' + latitude + ',' + longitude, // **替换成你的 AK**
      success: (addressRes) => {
        console.log("地址信息:", addressRes);
        if (addressRes.data.status === 0) {
          // 可以对地址进行处理，例如只显示城市或区
          const formattedAddress = addressRes.data.result.formatted_address;
          this.setGlobalLocation(latitude, longitude, formattedAddress);
        } else {
          console.error("反向地理编码失败:", addressRes.data);
          this.setGlobalLocation(latitude, longitude, '定位成功，但地址解析失败: ' + addressRes.data.message);
          wx.showToast({
            title: '地址解析失败',
            icon: 'none',
            duration: 2000
          });
        }

      },
      fail: (addressErr) => {
        console.error("地址解析失败:", addressErr);
        this.setGlobalLocation(null, null, '地址解析失败，请检查网络'); // 将 latitude 和 longitude 设置为 null
        wx.showToast({
          title: '地址解析失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  showLocationAuthDeniedModal: function() {
    wx.showModal({
      title: '需要定位权限',
      content: '请在设置中开启定位权限，才能获取您的**大致位置信息**，以便为您展示附近的猫咪信息。我们不会获取您的精确位置，您可以放心使用。',
      cancelText: "取消",
      confirmText: "去开启",
      success: (res) => {
        if (res.confirm) {
          wx.openSetting({
            success: (settingRes) => {
              // 用户在设置中开启了定位权限，重新获取定位
              if (settingRes.authSetting['scope.userLocation']) {
                // 用户在设置中开启了定位权限，重新获取定位
                this.getFuzzyLocation();
              } else {
                this.setGlobalLocation(null, null, '未开启定位权限');
                wx.showToast({
                    title: '您已拒绝授权',
                    icon: 'none',
                    duration: 2000
                });
              }
            }
          });
        } else {
            this.setGlobalLocation(null, null, '您已拒绝授权');
          // 用户选择了取消，不需要再次尝试获取定位
           wx.showToast({
                title: '您已拒绝授权',
                icon: 'none',
                duration: 2000
            });

        }
      }
    });
  },

  setGlobalLocation: function (latitude, longitude, address) {
    this.globalData.latitude = latitude;
    this.globalData.longitude = longitude;
    this.globalData.address = address;

    // 触发全局数据更新的监听器
    if (this.locationCallbacks) {
      this.locationCallbacks.forEach(callback => {
        callback({ latitude, longitude, address });
      });
    }
  },

  registerLocationCallback: function (callback) {
    if (!this.locationCallbacks) {
      this.locationCallbacks = [];
    }
    this.locationCallbacks.push(callback);
  },

  unregisterLocationCallback: function (callback) {
    if (this.locationCallbacks) {
      this.locationCallbacks = this.locationCallbacks.filter(cb => cb !== callback);
    }
  },

  clearCache() {
    // 解决长时间不打开小程序会加载失败的问题
    let clearDay = wx.getStorageSync('clear-all-cache');
    if (!clearDay || (new Date(clearDay)) < (new Date())) {
      console.log("清理所有缓存数据");
      wx.clearStorageSync();
      wx.setStorageSync('clear-all-cache', getDateWithDiffHours(48));
    } else {
      console.log("缓存仍然有效，过期时间", new Date(clearDay));
    }
  },

  globalData: {
    version: app_version,
    latitude: null, // 初始化为 null，表示尚未获取
    longitude: null, // 初始化为 null，表示尚未获取
    address: '正在定位...'
  }
});