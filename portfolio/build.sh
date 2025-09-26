
# docker build ./main-page -t chocalata/catalin-trandafir.com:my-web_2025-05-02-v1

# docker push chocalata/catalin-trandafir.com:my-web_2025-05-02-v1

app="my-web"
repository="chocalata/catalin-trandafir.com"

processes=("my-web")

echo "Choose a process to build:"
select process in "${processes[@]}"; do
  if [ -n "$process" ]; then
    break
  else
    echo "Invalid selection. Try again."
  fi
done

if [ -z "$process" ]; then
  echo "No process selected. Exiting..."
  exit 1
fi

# Set the folder and dockerfile for the selected process
if [ "$process" == "my-web" ]; then
  folder="./main-page/"
  dockerfile="Dockerfile"

else
  echo "Invalid process. Exiting..."
  exit 1
fi

last_version=$(grep $process version)

last_version_date=$(echo $last_version | cut -d' ' -f2 | cut -d'-' -f 1-3)
version_date=$(echo $last_version | cut -d' ' -f2 | cut -d'-' -f 1-3)
last_version_number=$(echo $last_version | cut -d' ' -f2 | cut -d'-' -f 4- | cut -d'v' -f 2)

today=$(date +"%Y-%m-%d")

if [ "$last_version_date" != "$today" ]; then
  version_date=$today
  version_number=1
else
  version_number=$((last_version_number+1))
fi

new_version="$version_date-v$version_number"

echo "Building $app"_"$new_version..."

# update the version file (if not exists, create it, if exists, update it with sed)
if [ -z "$last_version" ]; then
  echo "$process $new_version" >> version
else
  sed -i "s/$last_version/$process $new_version/g" version
fi

# Build the image
docker build -t "$repository:$app"_"$new_version" -f $folder$dockerfile $folder

docker push "$repository:$app"_"$new_version"