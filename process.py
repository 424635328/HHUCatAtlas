import os
import sys
from PIL import Image

def crop_images(input_folder, output_folder, width, height, crop_position="center"):
    """
    裁剪文件夹中的所有.jpg图片到指定大小。

    Args:
        input_folder (str):  包含.jpg图片的输入文件夹路径。
        output_folder (str): 裁剪后的图片保存的输出文件夹路径。
        width (int):  裁剪后的图片宽度。
        height (int):  裁剪后的图片高度。
        crop_position (str):  裁剪位置，可以是 "top", "center", 或 "bottom"。 默认为 "center"。
    """

    if not os.path.exists(input_folder):
        print(f"错误：输入文件夹 '{input_folder}' 不存在。")
        return

    if not os.path.exists(output_folder):
        os.makedirs(output_folder)  # 创建输出文件夹如果不存在

    image_count = 0
    for filename in os.listdir(input_folder):
        if filename.lower().endswith(".jpg"):  # 忽略大小写，只处理jpg文件
            input_path = os.path.join(input_folder, filename)
            output_path = os.path.join(output_folder, filename)  # 保持文件名

            try:
                image = Image.open(input_path)
                if crop_position == "top":
                    image = crop_top(image, width, height)
                elif crop_position == "bottom":
                    image = crop_bottom(image, width, height)
                else:
                    image = crop_center(image, width, height)  # 默认使用居中裁剪

                image.save(output_path)
                image_count += 1
                print(f"已裁剪并保存：{filename}")

            except FileNotFoundError:
                print(f"错误：找不到文件 {filename}")
            except IOError:
                print(f"错误：无法打开或处理文件 {filename}")
            except Exception as e:  # 处理其他可能的异常
                print(f"错误处理文件 {filename}: {e}")


    print(f"\n已裁剪 {image_count} 张图片。")


def crop_center(image, width, height):
    """
    从图片中心裁剪指定大小的区域。
    """
    image_width, image_height = image.size
    left = (image_width - width) // 2
    top = (image_height - height) // 2
    right = (image_width + width) // 2
    bottom = (image_height + height) // 2

    # 检查裁剪区域是否超出边界
    if left < 0: left = 0
    if top < 0: top = 0
    if right > image_width: right = image_width
    if bottom > image_height: bottom = image_height

    return image.crop((left, top, right, bottom))


def crop_top(image, width, height):
    """
    从图片顶部裁剪指定大小的区域。
    """
    image_width, image_height = image.size

    left = (image_width - width) // 2  # 水平居中
    top = 0  # 从顶部开始
    right = (image_width + width) // 2
    bottom = min(height, image_height)  # 裁剪到指定高度

    # 检查裁剪区域是否超出边界
    if left < 0: left = 0
    if right > image_width: right = image_width

    return image.crop((left, top, right, bottom))


def crop_bottom(image, width, height):
    """
    从图片底部裁剪指定大小的区域。
    """
    image_width, image_height = image.size

    left = (image_width - width) // 2  # 水平居中
    bottom = image_height  # 底部对齐
    top = max(0, image_height - height) #裁剪到指定高度，但不能超过原始顶部
    right = (image_width + width) // 2

    # 检查裁剪区域是否超出边界
    if left < 0: left = 0
    if right > image_width: right = image_width
    #if top < 0: top = 0

    return image.crop((left, top, right, bottom))



if __name__ == "__main__":
    # 默认值
    input_folder = "production"
    output_folder = "cropped_images"
    width = 1080
    height = 2300
    crop_position = "bottom"  # 默认裁剪模式为居中,可以是 "top", "center", 或 "bottom"

    # 允许通过命令行参数指定
    if len(sys.argv) > 1:
        input_folder = sys.argv[1]
    if len(sys.argv) > 2:
        output_folder = sys.argv[2]
    if len(sys.argv) > 3:
        try:
            width = int(sys.argv[3])
        except ValueError:
            print("警告：宽度必须是整数。使用默认值 200。")
    if len(sys.argv) > 4:
        try:
            height = int(sys.argv[4])
        except ValueError:
            print("警告：高度必须是整数。使用默认值 200。")

    if len(sys.argv) > 5:
        crop_position = sys.argv[5].lower()  # 使用 lowercase 进行匹配
        if crop_position not in ["top", "center", "bottom"]:
            print("警告：裁剪位置只能是'top', 'center', 或 'bottom'，使用默认值 'center'。")
            crop_position = "center"


    print(f"输入文件夹: {input_folder}")
    print(f"输出文件夹: {output_folder}")
    print(f"裁剪宽度: {width}")
    print(f"裁剪高度: {height}")
    print(f"裁剪位置： {crop_position}")


    crop_images(input_folder, output_folder, width, height, crop_position)