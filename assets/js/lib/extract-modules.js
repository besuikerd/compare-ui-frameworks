const nameRegex = /^\.\/(.*)\/index.js/;


/**
 * helper function to require all modules in a given subdirectory
 *
 * for example, to extract all modules in the './applications' folder, the following code should be added to the module
 * requiring it:
 *
 * const apps = require.context('./applications', true, /^\.\/.*\/index.js/);
 * const applications = extractModules(apps.keys(), apps.keys().map(apps));
 *
 * @param paths
 * @param modules
 * @param regex regex to match to (needs a match group to extract a name)
 * @param withDefault
 * @returns {{}}
 */
export default function extractModules(paths, modules, regex=nameRegex, withDefault=true){
  const applications = {};
  for(let i = 0 ; i < paths.length && i < modules.length ; i++){
    const path = paths[i];
    const app = withDefault && modules[i].default || modules[i];
    if(withDefault && !app){
      throw new Error('no default export found for module ' + path);
    }
    const match = path.match(regex);
    if(match){
      const appName = match[1];
      applications[appName] = app;
    } else{
      throw Error('invalid module found', path);
    }
  }

  return applications;
}

