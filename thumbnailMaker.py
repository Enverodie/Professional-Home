#!/usr/bin/python
from PIL import Image, UnidentifiedImageError
import os

thumbnail_size = 350
dir_path = os.path.dirname(os.path.realpath(__file__))
relative_path = "/static/creativePosts/"
save_into_directory = 'thumb' # the folder to save new images into

path = dir_path + relative_path
save_path = path + save_into_directory + '/'
dirs = os.listdir(path)


def resize():
    for item in dirs:
        if os.path.isfile(path + item):
            try:
                im = Image.open(path + item)
                file_name = os.path.basename(path+item)
                imResize = im.convert('RGBA')
                imResize.thumbnail((thumbnail_size, thumbnail_size), Image.ANTIALIAS)
                bg = Image.new("RGBA", imResize.size, (255,255,255))
                bg.paste(imResize, mask=imResize)
                bg = bg.convert("RGB")
                bg.save(save_path + file_name + '.jpeg', 'JPEG', quality=90)
                print("saved " + save_path + file_name + ".jpeg" + " with size " + str(imResize.width) + "x" + str(imResize.height))
            except UnidentifiedImageError:
                print("Image " + path+item + " is not a supported image")
            except OSError as e:
                print(e)
            except e:
                print("An unknown error has occurred while saving " + file_name + "\n" + e)

resize()