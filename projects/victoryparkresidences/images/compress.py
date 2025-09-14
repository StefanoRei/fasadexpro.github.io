import os
from PIL import Image
import glob

def convert_to_webp(input_path, output_path, max_size=None, quality=70):
    """
    Convert image to WebP format with optional resizing
    """
    try:
        with Image.open(input_path) as img:
            # Convert to RGB if necessary (for PNG with transparency)
            if img.mode in ('RGBA', 'LA'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                background.paste(img, mask=img.split()[-1])
                img = background
            elif img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Resize if max_size is provided and image is larger
            if max_size:
                width, height = img.size
                if width > max_size or height > max_size:
                    img.thumbnail((max_size, max_size), Image.LANCZOS)
            
            # Save as WebP
            img.save(output_path, 'WEBP', quality=quality, optimize=True)
            
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

def process_images():
    # Create output directories if they don't exist
    sizes = [320, 640, 1024, 4096]
    for size in sizes:
        os.makedirs(f"{size}px", exist_ok=True)
    os.makedirs("original", exist_ok=True)
    
    # Supported image formats
    supported_formats = ['*.jpg', '*.jpeg', '*.png', '*.bmp', '*.tiff', '*.gif']
    
    # Get all image files from origin folder
    image_files = []
    for fmt in supported_formats:
        image_files.extend(glob.glob(os.path.join('origin', fmt)))
        image_files.extend(glob.glob(os.path.join('origin', fmt.upper())))
    
    if not image_files:
        print("No images found in the 'origin' folder")
        return
    
    image_files = list(set(image_files))
    
    print(f"Found {len(image_files)} images to process")
    
    # Process each image
    for image_path in image_files:
        filename = os.path.splitext(os.path.basename(image_path))[0]
        print(f"Processing: {filename}")
        
        # Process for each target size
        for size in sizes:
            output_filename = f"{filename}.webp"
            output_path = os.path.join(f"{size}px", output_filename)
            
            # Convert and resize
            convert_to_webp(image_path, output_path, max_size=size)
        convert_to_webp(image_path, os.path.join(f"original", f"{filename}.webp"))
        
        print(f"  ✓ Completed processing for {filename}")
    
    print("\nAll images processed successfully!")

if __name__ == "__main__":
    # Check if origin folder exists
    if not os.path.exists('origin'):
        print("Error: 'origin' folder not found!")
        print("Please create an 'origin' folder and put your images in it.")
    else:
        process_images()