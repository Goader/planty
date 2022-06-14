from PIL import Image


def crop_photo(fp: str):
    photo = Image.open(fp)

    if photo.width > photo.height:
        upper = 0
        lower = photo.height
        left = (photo.width - photo.height) // 2
        right = left + photo.height
    else:
        upper = (photo.height - photo.width) // 2
        lower = upper + photo.width
        left = 0
        right = photo.width

    cropped = photo.crop((left, upper, right, lower))

    cropped.save(fp)
