//Задание №3 Напишите и типизируйте функцию, выполняющую запрос за данными по переданному URL. Выведите их в консоль в формате: "ID: id, Email: email".

interface Comment {
	id: number
	email: string
}

const getData = async (url: string): Promise<Comment[]> => {

	const response = await fetch(url)

	const data: Comment[] = await response.json()

	return data

}

const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments'

getData(COMMENTS_URL).then(data => {
	data.forEach(comment => {
		console.log(`ID: ${comment.id}, Email: ${comment.email}`)
	})
})