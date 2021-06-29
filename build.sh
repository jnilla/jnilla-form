devPath="/home/enav/apache/public_html/tmg/bcc/plugins/system/bccapi/libs/vendor/jnilla/joomla-cache-helper/"
repoPath="/home/enav/repos/joomla-cache-helper/"

echo "\n- Working - \n"

rsync -av --delete $devPath/src/ $repoPath/src/
rsync -av $devPath/composer.json $repoPath/composer.json
rsync -av $devPath/README.md $repoPath/README.md

echo "\n- Done - \n"

