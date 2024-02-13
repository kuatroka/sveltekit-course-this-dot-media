const getUserInfo = async (session: string) => {
	if (session) {
		return { name: session };
	}
};

export const handle = async ({ event, resolve }) => {
	const { locals, cookies } = event;
	if (cookies.get('session')) {
		locals.user = cookies.get('session');
	}

	return resolve(event);
};
