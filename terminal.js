document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.prompt').innerHTML = 'root@Sohaib:~# ';
  const term = new Terminal('#input-line .cmdline', '#container output');
  term.init();
});

class Terminal {
  constructor(cmdLineSelector, outputSelector) {
    this.cmdLine = document.querySelector(cmdLineSelector);
    this.output = document.querySelector(outputSelector);
    this.prompt = document.querySelector('.prompt');
    this.history = [];
    this.historyPosition = 0;
    this.tempHistory = '';
    this.commands = this.initializeCommands();
    this.availableCommands = Object.keys(this.commands);
    this.addEventListeners();
  }

  initializeCommands() {
    return {
      'clear': this.clear.bind(this),
      'help': this.help.bind(this),
      'whoami': this.whoami.bind(this),
      'education': this.education.bind(this),
      'experience': this.experience.bind(this),
      'skills': this.skills.bind(this),
      'interests': this.interests.bind(this),
      'projects': this.projects.bind(this),
      'contact': this.contact.bind(this),
      'ls': this.ls.bind(this)
    };
  }

  addEventListeners() {
    window.addEventListener('click', () => this.cmdLine.focus(), false);

    this.cmdLine.addEventListener('click', function () {
      this.value = this.value;
    }, false);

    this.cmdLine.addEventListener('keydown', this.handleHistory.bind(this), false);
    this.cmdLine.addEventListener('keydown', this.handleInput.bind(this), false);
  }

  handleHistory(e) {
    if (this.history.length) {
      if (e.keyCode === 38 || e.keyCode === 40) {
        if (this.history[this.historyPosition]) {
          this.history[this.historyPosition] = this.cmdLine.value;
        } else {
          this.tempHistory = this.cmdLine.value;
        }
      }

      if (e.keyCode === 38) { // Up
        this.historyPosition--;
        if (this.historyPosition < 0) {
          this.historyPosition = 0;
        }
      } else if (e.keyCode === 40) { // Down
        this.historyPosition++;
        if (this.historyPosition > this.history.length) {
          this.historyPosition = this.history.length;
        }
      }

      if (e.keyCode === 38 || e.keyCode === 40) {
        this.cmdLine.value = this.history[this.historyPosition] || this.tempHistory;
        this.cmdLine.value = this.cmdLine.value; // Set cursor to end
      }
    }
  }

  handleInput(e) {
    if (e.keyCode === 13) { // Enter
      if (this.cmdLine.value) {
        this.history.push(this.cmdLine.value);
        this.historyPosition = this.history.length;
      }

      const line = this.cmdLine.parentNode.parentNode.cloneNode(true);
      line.removeAttribute('id');
      line.classList.add('line');
      const input = line.querySelector('input.cmdline');
      input.autofocus = false;
      input.readOnly = true;
      this.output.appendChild(line);

      const inputValue = this.cmdLine.value.trim();
      if (inputValue) {
        const args = inputValue.split(' ').filter(Boolean);
        const cmd = args.shift().toLowerCase();

        if (this.commands[cmd]) {
          this.commands[cmd](args);
        } else if (this.availableCommands.includes(cmd)) {
          this.commands[cmd](args);
        } else {
          this.print(`${cmd}: command not found`);
        }
      }

      window.scrollTo(0, document.body.scrollHeight);
      this.cmdLine.value = '';
    } else if (e.keyCode === 9) { // Tab
      e.preventDefault();
      this.autocomplete();
    }
  }

  autocomplete() {
    let input = this.cmdLine.value.trim();
    const args = input.split(' ');
    const partial = args[args.length - 1];

    let possibilities = this.availableCommands.filter(c => c.startsWith(partial));

    if (possibilities.length === 1) {
      args[args.length - 1] = possibilities[0];
      this.cmdLine.value = args.join(' ') + ' ';
    } else if (possibilities.length > 1) {
      this.print(possibilities.join(' '));
    }
  }

  print(html) {
    this.output.insertAdjacentHTML('beforeEnd', `<p>${html}</p>`);
  }

  init() {
    const initialMessage = `
      <h1>Sohaib EL MEDIOUNI</h1>
      <h3>Ingénieur DevOps</h3>
      <p>
        <a href="https://www.linkedin.com/in/SohaibElMediouni/"><i class="fab fa-linkedin"></i></a>&nbsp;
        <a href="https://github.com/sohaibex"><i class="fab fa-github"></i></a>&nbsp;
        <a href="https://gitlab.com/sohaibex"><i class="fab fa-gitlab"></i></a>&nbsp;
        <a href="https://stackoverflow.com/users/10004574/sohaib-el-mediouni"><i class="fab fa-stack-overflow"></i></a>&nbsp;
      </p>
      <p>Entrez "help" pour plus d'informations.</p>
    `;
    this.print(initialMessage);
  }

  clear() {
    this.output.innerHTML = '';
    this.cmdLine.value = '';
  }

  help() {
    const helpText = `
      <h2>Aide</h2>
      <p>
        <b>whoami</b>: Affiche toutes mes informations.<br>
        <b>education</b>: Affiche mes formations.<br>
        <b>experience</b>: Affiche mes expériences professionnelles.<br>
        <b>skills</b>: Affiche mes compétences.<br>
        <b>interests</b>: Affiche mes centres d'intérêts.<br>
        <b>projects</b>: Affiche mes projets personnels.<br>
        <b>contact</b>: Me contacter.<br>
        <b>ls</b>: Liste des commandes disponibles.<br>
        <b>clear</b>: Efface le terminal.<br>
        <b>help</b>: Affiche ce menu.
      </p>
    `;
    this.print(helpText);
  }

  ls() {
    this.print(this.availableCommands.join(' '));
  }

  whoami() {
    const whoamiText = `
      <h1>Sohaib EL MEDIOUNI</h1>
      <p>Software engineer</p>
      <p>
       As an enthusiastic full stack web and mobile developer, I am passionate about creating secure and scalable web and hybrid mobile applications using diverse technologies. Moreover, I strive to collaborate with other professionals to enhance my skills and expand my expertise in various domains.
      </p>
    `;
    this.print(whoamiText);
  }

  education() {
    const educationText = `
      <h3>Formations</h3>
      <ul>
        <li><b>Master Cloud Computing and Mobility (En alternance)</b><br>Université de Picardie Jules-Verne (2022-2024) - Saint-Quentin, France</li>
        <li><b>Licence 3 en Métiers du Numérique</b><br>Université de Picardie Jules-Verne (2021-2022) - Saint-Quentin, France</li>
        <li><b>Ingénierie des Systèmes d'Information</b><br>SUPMTI (2020-2021) - Oujda, Maroc</li>
        <li><b>Technicien Spécialisé en Développement Informatique</b><br>Ista LAZARET (2018-2020) - Oujda, Maroc</li>
        <li><b>Baccalauréat en Sciences Physiques</b><br>Lycée Omar Ibn Abd El Aziz (2016-2017) - Oujda, Maroc</li>
      </ul>
    `;
    this.print(educationText);
  }

  experience() {
    const experienceText = `
      <h3>Expériences Professionnelles</h3>
      <ul>
        <li><b>Développeur Concepteur chez Natixis (En alternance)</b><br>Octobre 2023 - 2024 - Paris, France
          <ul>
            <li>Refonte de l’architecture du Directory Service pour les sites en Asie, Amérique et Europe.</li>
            <li>Réalisation de tests de performance avec K6.</li>
            <li>Implémentation de tests Gherkin pour le BDD.</li>
            <li>Conception et implémentation de services REST et WCF.</li>
            <li>Déploiement des stacks Elasticsearch et Kibana sur OpenShift.</li>
          </ul>
        </li>
        <li><b>Développeur Full Stack chez each One (En alternance)</b><br>Septembre 2022 - Septembre 2023 - Paris, France
          <ul>
            <li>Développement d'une application mobile pour faciliter la candidature des réfugiés en France.</li>
            <li>Front-end avec Flutter et back-end en ASP.NET Core Web API.</li>
          </ul>
        </li>
        <li><b>Développeur Front-End T-RECS</b><br>Capital Fund Management - Avril 2022 - Septembre 2022 - Paris, France
          <ul>
            <li>Développement de nouvelles fonctionnalités pour le projet T-RECS (front-end).</li>
            <li>Technologies utilisées: Angular, Flask, Oracle.</li>
          </ul>
        </li>
        <li><b>Développeur Full-Stack</b><br>BEEKOM - Mars 2020 - Mars 2021 - Oujda, Maroc
          <ul>
            <li>Site web du café <a href="https://www.assitana.com/">Assitana</a>.</li>
            <li>Application Web de gestion de Syndic avec Laravel.</li>
            <li>Plateforme Web de gestion de Livraison avec Symfony (API Platform) et Angular.</li>
            <li>Site web de la salle Formule Sport en WordPress.</li>
          </ul>
        </li>
        <li><b>Freelancer</b><br>2019 - 2024
          <ul>
            <li>Application ACTIFZ pour la gestion du patrimoine avec React Native et Stripe.</li>
            <li>Application web Mylittle Roof avec Next.js et Nest.js.</li>
            <li>Site web e-commerce "Electro Tasnime" avec WordPress WooCommerce.</li>
            <li>Application web avec Angular 11 et backend avec Symfony API Platform.</li>
            <li>Site web pour "Saidi Moto".</li>
          </ul>
        </li>
        <li><b>Stage Développeur Web</b><br>Technologica - Décembre 2019 - Mai 2020 - Oujda, Maroc
          <ul>
            <li>Réalisation du site web officiel de l'entreprise avec WordPress.</li>
          </ul>
        </li>
        <li><b>Stage Développeur Mobile</b><br>Kayna Solution - Juin 2018 - Août 2018 - Oujda, Maroc
          <ul>
            <li>Réalisation d'une application de géolocalisation GPS en utilisant Android Studio et les API de Google Maps.</li>
          </ul>
        </li>
      </ul>
    `;
    this.print(experienceText);
  }

  skills() {
    const skillsText = `
      <h3>Compétences</h3>
      <p>
        <b>Cloud:</b> OpenShift, GCP, Azure, Ansible, Docker, Kubernetes, Terraform<br>
        <b>Front-End:</b> HTML, CSS, Bootstrap, Tailwind, JavaScript, TypeScript, Angular, React<br>
        <b>Back-End:</b> Symfony, Laravel, Java/Spring Boot, C#, ASP.NET/Core, Node.js, Python<br>
        <b>Temps réel:</b> Kafka, Tibco Rendezvous (RDV)<br>
        <b>Desktop:</b> C, C#<br>
        <b>Logging & Monitoring:</b> ELK Stack, Prometheus, Grafana<br>
        <b>Outils CI/CD:</b> XLR/XLD, Jenkins, GitHub Actions, GitLab CI<br>
        <b>Mobile:</b> Flutter, React Native<br>
        <b>Bases de Données:</b> SQL Server, MySQL, SQLite, MongoDB, PostgreSQL
      </p>
    `;
    this.print(skillsText);
  }

  interests() {
    const interestsText = `
      <h3>Centres d'Intérêt</h3>
      <p>Lecture, Échecs, Voyage, Développement Personnel</p>
    `;
    this.print(interestsText);
  }

  projects() {
    const projectsText = `
      <h3>Projets Personnels</h3>
      <ul>
        <li>Système de gestion et prédiction pour vélos en libre-service (GCP, Machine Learning, Vertex AI)</li>
        <li>Application en temps réel avec architecture microservices (Node.js, React)</li>
        <li>CRM avec Angular et Symfony</li>
        <li>Gestion de livraison avec Spring Boot</li>
        <li>Application Mobile "My Trip" (Android Studio, Google Photo API, Firebase)</li>
      </ul>
      <h3>Autres Réalisations</h3>
      <ul>
        <li><a href="http://assitana.com/">Assitana</a></li>
        <li><a href="https://rwahtsouwek.store/">rwahtsouwek.store</a></li>
        <li><a href="https://laplanetestores.com">laplanetestores.com</a></li>
        <li><a href="http://technologica.ma/">Technologica.ma</a></li>
        <li><a href="https://syndik.beekom.ma/">Syndik.beekom.ma</a></li>
        <li><a href="https://beekom.ma/">Beekom.ma</a></li>
        <li><a href="https://fs.beekom.ma">Fs.beekom.ma</a></li>
        <li><a href="https://saidi-moto.ma/">Saidi-moto.ma</a></li>
        <li><a href="https://rsb.ma/">rsb.ma</a></li>
        <li><a href="https://clin.beekom.ma/">Clin.com</a></li>
        <li><a href="https://flash-box.ma/">Flashbox.ma</a></li>
      </ul>
    `;
    this.print(projectsText);
  }

  contact() {
    const contactText = `
      <h3>Contact</h3>
      <p>
        Email: <a href="mailto:sohaib.elmediouni23@gmail.com">sohaib.elmediouni23@gmail.com</a><br>
        PGP : 940017346485B8AF6098C6DB4C3C4BB040EC0D1A <br>
        Téléphone: +33 7 48 48 22 77<br>
        LinkedIn: <a href="https://www.linkedin.com/in/SohaibElMediouni/">SohaibElMediouni</a>
      </p>
    `;
    this.print(contactText);
  }
}
