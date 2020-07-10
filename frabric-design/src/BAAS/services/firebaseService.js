import { firebaseApp, firebaseFirestore } from '../utils/firebaseUtils';

class FirebaseService {
	async getDesenhos() {
		let desenhos = [];
		let db = firebaseFirestore.collection('desenhos');
		await db.get().then(querySnapshot => {
				querySnapshot.docs.map(doc => {
					desenhos.push({...doc.data()})
				})
		})
		return desenhos;
	}

	async createDesenho(nomeTecido, nomeDesenho, DO, categoria, zona1, zona2, zona3, pre1, pre2, pre3, pre4) {
		try {
			await firebaseFirestore.doc('desenhos/' + nomeDesenho).set({
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
				pre4
			});
			return true;
		} catch (error) {
			return false;
		}
	}
}

export default new FirebaseService();