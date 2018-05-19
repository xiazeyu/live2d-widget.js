#!/bin/bash
openssl aes-256-cbc -K $encrypted_7ae5308e2fd2_key -iv $encrypted_7ae5308e2fd2_iv -in build/id_rsa.enc -out ~/.ssh/id_rsa -d
chmod 600 ~/.ssh/id_rsa
eval $(ssh-agent)
ssh-add ~/.ssh/id_rsa
cp build/ssh_config ~/.ssh/config
git config --global user.name 'xiazeyu'
git config --global user.email 'xiazeyu_2011@126.com'
npm run build:esdoc
npm run deploy:ghpages
