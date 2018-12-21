# Scripts
Alle scripts die zich in deze map bevinden zijn getest en werken op een Debian 9. De repository moet zich bevinden in de map /var/howtotest. Indien de repository zich ergens anders bevind, zullen de scripts (en de service) niet werken.

De linux machine moet ook de mongod service draaien. Voor installatie zie [Officiele mongodb documentatie](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-debian/)

Het bestand [howtotest.service](howtotest.service) die geplaatst te worden in de map /etc/systemd/system/

Het script [makeAdmin](mongo/makeAdmin) maakt van een gebruiker met het meegegeven email een admin. Voor het gebruik van dit script, zie [README.md](mongo/README.md)
