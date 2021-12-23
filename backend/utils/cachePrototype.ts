const getData = () => {
	return new Promise((resolve, reject) => {
        // cache.get(someDataFromDB)
        const cacheData = "some cached data that been cached before"

		const slowServerResponse = setTimeout(() => {
            resolve(cacheData)
        },20000)

        if (cacheData) {
            clearTimeout(slowServerResponse)
            resolve(cacheData)
        }
	});
};

const showData = async () => { console.log(await getData()) }

showData()

