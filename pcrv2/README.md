Le script mache pas mdr
mais les commandes sont juste il faut juste que tu le lance a la mano


prometheus / grafana 

kubectl apply -f prometheus.yml
kubectl apply -f grafana.yml

VOIR COURS 8 pour plus d'approfondissement
connexion :
login : admin / mdp admin
et le set up bah faut faire soi meme i guess vu que je sais pas comment le faire en auto XD

pour le data source  dans grafana :

url = soit http://localhost:9090 soit  http://prometheus.default.svc.cluster.local:9090
( optionnel pour le moment d'apres ce que j'ai crompris du mail sur whatsapp , je te laisse confirmer)
pour les dashboard il faudra importer pour plus de simplicité :
tu check des codes grafana quoi

il faudra edit les N/A avec des query qu'on peut utiliser 



---
CE qu'il doit nous rester a faire je suppose :
-persistance des données dans la database ( donc utiliser un volume)
-faire des redis/replicas de la base de donné si j'ai bien compris le sujet ? ( y a un yml dans github_crv/database/ pour redis-replica)
-le rapport pdf 
-le script bash
-un readme pour indiquer quel script lancé...

PS : ton front se down tout seul de mon coté donc j ai laisser tomber ( je sais pas la raison)