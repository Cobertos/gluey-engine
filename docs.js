import jsdoc2md from 'jsdoc-to-markdown';
import fs from 'fs';
import path from 'path';

/* input and output paths */
const inputFile = path.resolve(__dirname, "src/**/*.js");
const outputDir = path.resolve(__dirname, "docs");

/* get template data */
const templateData = jsdoc2md.getTemplateDataSync({ files: inputFile })

/* reduce templateData to an array of class names */
const classNames = templateData.reduce((classNames, identifier) => {
  if (identifier.kind === 'class') classNames.push(identifier.name);
  console.log(identifier);
  return classNames;
}, []);

/* create a documentation file for each class */
for (const className of classNames) {
  const template = `{{#class name="${className}"}}{{>docs}}{{/class}}`;
  console.log(`rendering ${className}, template: ${template}`);
  const output = jsdoc2md.renderSync({ data: templateData, template });
  fs.writeFileSync(path.resolve(outputDir, `${className}.md`), output);
}
//Also add SimObject function
const template = `{{#function name="SimObject"}}{{>docs}}{{/function}}`;
console.log(`rendering SimObject, template: ${template}`);
const output = jsdoc2md.renderSync({ data: templateData, template });
fs.writeFileSync(path.resolve(outputDir, `SimObject.md`), output);