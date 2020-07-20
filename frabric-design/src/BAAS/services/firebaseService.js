import { firebaseApp, firebaseFirestore } from '../utils/firebaseUtils';

class FirebaseService {
	async getDesenhos() {
		let desenhos = [];
		let db = firebaseFirestore.collection('desenhos');
		await db.get().then(querySnapshot => {
			querySnapshot.docs.map(doc => {
				desenhos.push({ ...doc.data() })
			})
		})
		return desenhos;
	}

	async getDesenho(id) {
		let desenho = {
			id: '',
			nomeTecido: '',
			nomeDesenho: '',
			DO: '',
			categoria: '',
			zona1: '',
			zona2: '',
			zona3: '',
			pre1: '',
			pre2: '',
			pre3: '',
			pre4: ''
		}
		let db = firebaseFirestore.collection('desenhos').doc(id);
		await db.get().then(function (doc) {
			desenho.id = doc.data().id;
			desenho.nomeTecido = doc.data().nomeTecido;
			desenho.nomeDesenho = doc.data().nomeDesenho;
			desenho.DO = doc.data().DO;
			desenho.categoria = doc.data().categoria;
			desenho.zona1 = doc.data().zona1;
			desenho.zona2 = doc.data().zona2;
			desenho.zona3 = doc.data().zona3;
			desenho.pre1 = doc.data().pre1;
			desenho.pre2 = doc.data().pre2;
			desenho.pre3 = doc.data().pre3;
			desenho.pre4 = doc.data().pre4;
		});
		return desenho;
	}

	async createDesenho(nomeTecido, nomeDesenho, DO, categoria, zona1, zona2, zona3, pre1, pre2, pre3, pre4) {
		try {
			await firebaseFirestore.collection('desenhos').add({
			}).then(function (docRef) {
				firebaseFirestore.collection('desenhos').doc(docRef.id).set({
					id: docRef.id,
					nomeTecido,
					nomeDesenho,
					DO,
					categoria,
					zona1,
					zona2,
					zona3,
					pre1,
					pre2,
					pre3,
					pre4,
				})
			}).catch(function (error) {
				console.error("Error adding document: ", error);
				return error;
			});
			return true;
		} catch (error) {
			console.log(error)
			return false;
		}
	}

	async updateDesenho(id, nomeTecido, nomeDesenho, DO, categoria, zona1, zona2, zona3, pre1, pre2, pre3, pre4) {
		try {
			await firebaseFirestore.collection('desenhos').doc(id).set({
				id,
				nomeTecido,
				nomeDesenho,
				DO,
				categoria,
				zona1,
				zona2,
				zona3,
				pre1,
				pre2,
				pre3,
				pre4,
			})
			return true
		} catch (error) {
			console.log(error)
			return false;
		}
	}

	async deleteDesenho(id) {
		try{
			firebaseFirestore.collection('desenhos').doc(id).delete();
			return true;
		}catch(error){
			return error;
		}
	}
}

export default new FirebaseService();