cd ghpages
del "stats.html"
cd ../lib
copy "stats.html" "../ghpages/stats.html"
npm run _esdoc
