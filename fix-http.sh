#!/bin/bash

TARGET="http://cps.safarnameh24.com"
REPLACEMENT="https://cps.safarnameh24.com"

echo "🔍 در حال جستجو برای URL های HTTP..."
echo "------------------------------------------------"

# لیست پسوندهایی که باید اسکن شوند
EXTENSIONS=("ts" "tsx" "js" "jsx" "json" "css" "scss")

# فولدرهایی که باید اسکن شوند
DIRECTORIES=("src" "app" "public")

for DIR in "${DIRECTORIES[@]}"; do
  if [ -d "$DIR" ]; then
    echo "📁 اسکن فولدر: $DIR"

    for EXT in "${EXTENSIONS[@]}"; do
      FILES=$(find "$DIR" -type f -name "*.$EXT")

      for FILE in $FILES; do
        if grep -q "$TARGET" "$FILE"; then
          echo "✔ اصلاح شد: $FILE"
          sed -i "s|$TARGET|$REPLACEMENT|g" "$FILE"
        fi
      done
    done
  fi
done

echo "------------------------------------------------"
echo "🎉 تمام URL های HTTP به HTTPS تبدیل شدند!"
