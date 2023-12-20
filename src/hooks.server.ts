
const getUserInfo = async (session: string) => {
    if (session) {
        return { name: session };
    };
};


export const handle = async ({ event, resolve   }) => {
    const session = event.cookies.get('session');
    if (session) {
        const user = await getUserInfo(session);
        event.locals.user = user;

    }
    console.log('user: ', event.locals.user);

    return resolve(event);
}