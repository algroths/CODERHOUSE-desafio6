const fs = require('fs');

class ContenedorMessages {

    constructor(nombre) {
        this.nombre = nombre;
        this.dataObj = [];
    }

    async save(obj) {
        try {
            await fs.promises.access(`./${this.nombre}`);
            try {
                let data = await fs.promises.readFile(`./${this.nombre}`, 'utf-8');
                this.dataObj = JSON.parse(data);
                obj.id = this.dataObj.length + 1;
                this.dataObj.push(obj);

                try {
                    await fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(this.dataObj, 2));
                } catch (err) {
                    console.log('Error append', err);
                }
            } catch (err) {
                console.log('Error en acces', err);
            }
        } catch (err) {
            try {
                this.dataObj = [];
                obj.id = 1;
                this.dataObj.push(obj)
                await fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(this.dataObj, 2));
            } catch (err) {
                console.log('Error en escritura', err);
            }
        }
    }
}

module.exports = ContenedorMessages;