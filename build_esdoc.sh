#!/bin/bash
rm ghpages/stats.html
cp lib/stats.html ghpages/stats.html
npm run _esdoc
