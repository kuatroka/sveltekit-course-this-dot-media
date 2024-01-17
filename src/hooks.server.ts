
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

    // console.log('user: ', event.locals.user);

    return resolve(event);
}


// export const handle = async ({ event, resolve   }) => {

//     event.locals.myvar = "whatever goes here";
//     event.locals.user  = "maputu..."
//     const response = await resolve(event);
//     console.log(event)


//     return  response;
// }