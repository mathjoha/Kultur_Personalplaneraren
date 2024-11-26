#!/bin/bash

npm run build

cp -r dist/* docs/

touch docs/.nojekyll
