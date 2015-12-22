
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
    blurb: 'I grew up in Hillsboro, OR. I really enjoy: making beats that I post <a href="https://soundcloud.com/cold-teeth" target="_blank">here</a>, looking at cool rocks on the beach, playing with my dog as if I were a dogish manbeast, not using an umbrella, and most of all feeling like this pretty regularly:<img height="100px" width="100px" src="http://i.imgur.com/XWOuu8G.gif" alt="gas-logo"></img> you can lurk @<br><a href="https://soundcloud.com/cold-teeth" target="_blank">My GertHerb</a><br>or<br><a href="https://github.com/andalex" target="_blank">My Twerter</a>'
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
