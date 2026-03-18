const now = String(Date.now())

module.exports = function(eleventyConfig) {
  eleventyConfig.addWatchTarget('./tailwind.config.js')
  eleventyConfig.addWatchTarget('./src/assets/css/index.css')

  eleventyConfig.addPassthroughCopy({ './_tmp/style.css': './style.css' })

  eleventyConfig.addShortcode('version', function () {
    return now
  })

  eleventyConfig.addCollection("docsByFolder", function(collectionApi) {
    const docs = collectionApi.getFilteredByGlob("docs/**/*.md");
    const groups = {};

    for (const doc of docs) {
      const parts = doc.filePathStem.split("/");
      // e.g. /docs/philosophy/my-page → "philosophy"
      // e.g. /docs/my-page → "General"
      const folder = parts.length > 2 ? parts[parts.length - 2] : "General";

      if (!groups[folder]) groups[folder] = [];
      groups[folder].push(doc);
    }

    return groups;
  });
}