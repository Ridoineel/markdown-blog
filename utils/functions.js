const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const {marked} = require("marked");
const slugify = require("slugify")

const dompurify = createDomPurify(new JSDOM().window);

exports.markdownToHtml = (markdown) => {
    let html;

    // convert markdown to html
    // elements
    html = marked(markdown);

    // purify html
    html = dompurify.sanitize(html)

    return html;
}