export module WorkerModule {

    export function boiler( ) {
        const routes:{[key:string]:Function} = { };
        self.onmessage = async(event) => {
            const {route, message} = event.data;
            if( routes[route] ) {
                const result = await routes[route](message);
                return postMessage({route, result});
            }
        }
        return {
            on: function( route:string, method: Function) {
                routes[route] = method;       
            },

            close: function( route: string ) {
                delete routes[route];
            }
        }
    }

}