#!/bin/bash

# Manga Image Optimization Script
# Converts images to WebP format with optimized quality and size
# Usage: ./optimize-images.sh <input_directory> <output_directory>

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <input_directory> <output_directory>"
    echo "Example: $0 ./raw-pages ./client/public/pages"
    exit 1
fi

INPUT_DIR="$1"
OUTPUT_DIR="$2"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is not installed. Installing..."
    sudo apt-get update && sudo apt-get install -y imagemagick
fi

# Counter for processed images
count=0

echo "Starting image optimization..."
echo "Input: $INPUT_DIR"
echo "Output: $OUTPUT_DIR"
echo "---"

# Process all image files in the input directory
shopt -s nullglob
for img in "$INPUT_DIR"/*.jpg "$INPUT_DIR"/*.jpeg "$INPUT_DIR"/*.png "$INPUT_DIR"/*.JPG "$INPUT_DIR"/*.JPEG "$INPUT_DIR"/*.PNG; do
    
    # Get filename without extension
    filename=$(basename "$img")
    name="${filename%.*}"
    
    # Output path
    output="$OUTPUT_DIR/${name}.webp"
    
    echo "Processing: $filename"
    
    # Convert to WebP with optimization
    # - Resize to max width of 1200px (maintains aspect ratio, good for web)
    # - Quality 85 (good balance between size and quality)
    # - Strip metadata to reduce file size
    convert "$img" \
        -resize '1200x>' \
        -quality 85 \
        -strip \
        "$output"
    
    if [ $? -eq 0 ]; then
        # Get file sizes
        original_size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
        new_size=$(stat -f%z "$output" 2>/dev/null || stat -c%s "$output" 2>/dev/null)
        
        # Calculate size reduction
        reduction=$(echo "scale=1; 100 - ($new_size * 100 / $original_size)" | bc)
        
        echo "  ✓ Saved: $output (${reduction}% smaller)"
        count=$((count + 1))
    else
        echo "  ✗ Failed to process $filename"
    fi
done

echo "---"
echo "Optimization complete! Processed $count images."
echo "Images saved to: $OUTPUT_DIR"
