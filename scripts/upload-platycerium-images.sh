#!/bin/bash
# Upload archived Platycerium images to Firebase Storage.
#
# Prerequisites:
#   1. Firebase CLI installed and logged in (`firebase login`)
#   2. Firebase Storage enabled in your project console
#     (https://console.firebase.google.com → Storage → Get Started)
#   3. Storage rules set to allow public reads:
#        rules_version = '2';
#        service firebase.storage {
#          match /b/{bucket}/o {
#            match /platycerium-archive/{allPaths=**} {
#              allow read;        // public
#              allow write: if false;  // upload via CLI only
#            }
#          }
#        }
#   4. gsutil installed (comes with Google Cloud SDK, or `brew install google-cloud-sdk`)
#
# Usage:
#   chmod +x scripts/upload-platycerium-images.sh
#   ./scripts/upload-platycerium-images.sh
#
# After uploading, update PLATYCERIUM_IMAGE_BASE in
# src/data/platyceriumImages.ts with your bucket name.

set -euo pipefail

ARCHIVE_DIR="$(cd "$(dirname "$0")/.." && pwd)/platycerium-archive"
# Replace with your actual Firebase project's default storage bucket
BUCKET="bb-folio.firebasestorage.app"

if [ ! -d "$ARCHIVE_DIR" ]; then
  echo "Error: $ARCHIVE_DIR not found."
  echo "Make sure the platycerium-archive directory is at the repo root."
  exit 1
fi

echo "Uploading images from $ARCHIVE_DIR to gs://$BUCKET/platycerium-archive/"
echo ""

gsutil -m cp -r "$ARCHIVE_DIR/*" "gs://$BUCKET/platycerium-archive/"

echo ""
echo "Done! Update PLATYCERIUM_IMAGE_BASE in src/data/platyceriumImages.ts:"
echo ""
echo "  export const PLATYCERIUM_IMAGE_BASE ="
echo "    \"https://firebasestorage.googleapis.com/v0/b/$BUCKET/o/platycerium-archive%2FImages%2F\";"
echo ""
echo "Then redeploy: pnpm run deploy"
