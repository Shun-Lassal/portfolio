<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="style/style.css" rel="stylesheet">
    <title>Shun Lassal - Portfolio</title>
</head>
<body>
    <header>
        <nav>
            <a class="navlink1" href="">Shun Lassal</a>
            <a class="navlink2" href="#apropos">A propos</a>
            <a class="navlink2" href="#projets">Projets</a>
            <a class="navlink2" href="#contact">Contact</a>
        </nav>
    </header>
    <section class="accueil">
        <h1>Bienvenue</h1>
        <h2>Portfolio de Shun Lassal</h2>
    </section>
    <section class="spacing">
    </section>
    
    <section id="apropos">
        <section class="container">
            <h3>A propos</h3>
        
            <section class="apropos1">

                <section class="inside1">
                    <img id="profilpic" src="style/images/member.png" alt="">
                    <span id="underpic">Shun Lassal, 22 ans.</span>
                </section>

                <section class="inside2">
                    <p class="profildesc">Actuellement à LaPlateforme dans le but d'obtenir mon diplôme de développeur Web/Mobile.</p>
                    <p class="profildesc">J'habite dans le 11ème arrondissement à Marseille.</p>
                    <p class="profildesc" id="underline">Je suis à la recherche d'une alternance.</p>
                    <a class="git" href="">Mon CV</a>
                </section>

                <section class="inside3">
                    <span class="skills">Mes compétences..</span>
                    <ul>
                        <li>HTML5 & CSS</li>
                        <li>SQL</li>
                        <li>PHP</li>
                        <li>Javascript/JQuery</li>
                    </ul>
                    <hr/>
                    <span class="skills">J'aime..</span>
                    <ul>
                        <li>La nature</li>
                        <li>Les jeux vidéos</li>
                        <li>Le sport</li>
                        <li>Les voyages</li>
                    </ul>
                </section>

        </section>
    </section>

    <section class="spacing">
    </section>

    <section id="projets">
        <section class="container">
            <h3>Mes projets</h3>
            <section>
                <p class="profildesc">Construction..</p>
            </section>
            <a class="git" href="https://github.com/Shun-Lassal/">Voir mon github</a>
        </section>
    </section>
    
    <section class="spacing">
    </section>

    <section id="contact">
        <section class="container">
            <h3>Contact</h3>
            <section class="form">
                <section class="info">
                    <h4>Mes infos</h4>
                    <span class="infos"><b>E-mail:</b> shun.lassal@laplateforme.io</span>
                    <span class="infos"><b>Numéro:</b> 06.33.71.57.13</span>
                </section>
                <form id="form" action="" method="POST">
                    <label for="Prenom">Prénom</label>
                    <input name="Prenom" type="text">
                    <label for="Nom">Nom</label>
                    <input name="Nom" type="text">
                    <label for="mail">E-mail</label>
                    <input name="mail" type="mail">
                    <label for="text">Message</label>
                    <textarea name="text" id="textarea" cols="30" rows="10"></textarea>
                    <input class="git" name="submit" type="submit" value="Envoyer">
                </form>
            </section>
            <h3>Au plaisir, à bientot !</h3>
        </section>
    </section>
</body>
</html>