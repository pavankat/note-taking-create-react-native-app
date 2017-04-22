var api = {
    getBio(username){
        username = username.toLowerCase().trim();
        //use backticks here because with es6 we can do interpolation this way
        var url = `https://api.github.com/users/${username}`;

        //fetch is how you do ajax queries in react native. As of 2/23/17 it's not available in chrome but it will be eventually.

        //res.json() gets returned
        // when you do => we don't have to do function()... 
        //also when you do => you don't have to bind scope to the parent function. It automatically uses the parent function's this
        return fetch(url).then((res) => res.json())
    },
    getRepos(username){
        username = username.toLowerCase().trim();
        var url = `https://api.github.com/users/${username}/repos`;
        return fetch(url).then((res) => res.json());
    },
    getNotes(username){
        //https://react-native-repo-notes.firebaseio.com.json/
        
        username = username.toLowerCase().trim();
        var url = `https://react-native-repo-notes.firebaseio.com/${username}.json`;
        return fetch(url).then((res) => res.json())
    },
    addNote(username, note){
        username = username.toLowerCase().trim();
        var url = `https://react-native-repo-notes.firebaseio.com/${username}.json`;
        return fetch(url, {
            method: 'post',
            body: JSON.stringify(note)
        }).then((res) => res.json());
    }
};

export default api;