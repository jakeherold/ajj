function printDevelopers(x){
$.get('js/template.html', function(templateData) {

      $.each(x, function(key, value) {
        $developerAnchor = $('#developerAnchor');
        var theTemplate = Handlebars.compile(templateData);
        var finishedArticle = theTemplate(value);
        // cl(finishedArticle);
        $developerAnchor.append(finishedArticle);
      });
   });
}
var developers = [
  {
    name: "Alex Anderson",
    blurb: "Alex is cool guy that builds cool stuff."
  },
  {
    name: "Jessica Hurr",
    blurb: "Jessica is cool gal that builds cool stuff."
  },
  {
    name: "Jake Herold",
    blurb: "Jake is cool guy that builds cool stuff."

  }

];

printDevelopers(developers);
