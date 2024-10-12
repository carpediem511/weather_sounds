//Задание #1/ Напишите и типизируйте функцию, рассчитывающую стоимость с учетом скидки и рассрочки на заданное количество месяцев:

interface TotalPriceType {
	price: number
	discount: number
	isInstallment: boolean
	months: number
}

const TotalPrice = ({ price, discount, isInstallment, months }: TotalPriceType): number => {

	const discountedPrice = price - (price * discount) / 100

	if (isInstallment) {
		return discountedPrice / months
	} else {
		return discountedPrice
	}
}

const price = TotalPrice({ price: 100000, discount: 25, isInstallment: true, months: 12 });
console.log(price); // 6250

