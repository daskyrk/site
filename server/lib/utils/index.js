const requireContext = require('require-context')

exports.requireAll = function(
  path,
  recursive,
  regExp,
  filter,
) {
  const files = requireContext(path, recursive, regExp);
  let filenames = files.keys();

  if(typeof filter === 'function'){
    filenames = filenames.filter(filter);
  }

  const moduleObj = {};
  filenames.map(filename => moduleObj[filename.slice(0, filename.lastIndexOf('.'))] = files(filename));

  return moduleObj;
};

