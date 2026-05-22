from PIL import Image
import subprocess
import sys

input_path = "/Users/joshuaforster/Documents/Programming/integrity/public/logo.webp"
output_path = "/Users/joshuaforster/Documents/Programming/integrity/public/logo.svg"

img = Image.open(input_path)
img_big = img.resize((img.width * 8, img.height * 8), Image.LANCZOS)
img_grey = img_big.convert("L")
img_bw = img_grey.point(lambda x: 0 if x < 128 else 255, "1")
img_bw.save("/tmp/logo_trace.bmp")

subprocess.run([
    "potrace",
    "/tmp/logo_trace.bmp",
    "-s",
    "--turdsize", "5",
    "--alphamax", "1",
    "--opttolerance", "0.2",
    "-o", output_path
])

print(f"Done — SVG saved to {output_path}")