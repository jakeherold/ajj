
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
    name: "Jessica Hur",
    blurb: 'Jessica Hur graduated UC Berkeley in 2013 with a degree in bioengineering-biomechanics. Although biomechanics was cool and she also had fun playing withthe beetles in professor Michel Mahabizs lab, she found out that web developmenis so much cooler and much more fun. She is attending Code 301 at Code Fellows. She really enjoys playing with her adorable dogs. <br><img height="180px" width="300px" src="http://a2.web.wt-cdn.com/post_items/images/000/023/971/original/tumblr_meo8moUf1Q1rkh2rbo1_500.gif" alt="gas-logo"></img>'
  },

  {
    name: "Jake Herold",
    blurb: 'Jake Herold is a Portland native, beard enthusiast, and green-bean web developer. He plays guitar, makes beard oil, and spends a lot of time thinking about the boks at Powells that he doesnt own yet. He finaly has time to take, like...one nap now that he is done with Codefellows 301 class.  <br> <img height="180px" width="300px" src="http://i.imgur.com/HBvvuvc.gif" alt="gas-logo"></img>'

  }

];

printDevelopers(developers);
