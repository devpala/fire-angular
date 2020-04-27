
npm install @pala/fire-angular --save


# Interface para las architecture database


Interfaz IColecciones {
    coleccion:string[];
    documento:string[];
    subcoleccion:string[];
    subdocumento:string[];
}

# Ejemplo

Interfaz IColecciones {
    coleccion:string['usuarios'];
    documento:string['ajhxbavsgva'];
    subcoleccion:string['chats'];
    subdocumento:string['bjhxaaabsjvq'];
}

ADVERTENCIA: se puede realizar hasta 2 profundidades de colecciones, recuerde que fire-angular solo facilita las funciones de @angular/fire no remplaza sino lo complementa por lo que es libre de realizar las profundidades que desee llamando a @angular/fire. fire-angular esta construido con @angular/fire por lo que debera instalarlo junto con firebase tambien.