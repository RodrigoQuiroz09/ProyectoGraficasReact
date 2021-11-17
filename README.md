# Proyecto-Graficas TC3022
## Integrantes
Christopher Luis Miranda Vanegas A01022676

Rodrigo Quiroz Reyes A01026546

## Avance Final
Nuestro proyecto final consiste en una guitarra estilo steampunk interactiva. A continuación se muestra el [modelo final](#modelo-final) de la guitarra en *Blender*, con texturas y materiales aplicados. Como se mencionó, buscamos crear una guitarra con estilo steampunk, es por esta razón que se usaron diferentes engranes, monedas, cadenes, tuercas y ornamentos.

Enseguida se muestra la primer funcionalidad e interacción del proyecto terminado. Esta es la [interacción con las cuerdas](#interacción-con-cuerdas), en donde al dar click a una cuerda de la guitarra, esta emite el sonido correspodiente a la cuerda seleccionada. La cuerda seleccionada cambiará a color azul para saber que cuerda fue la seleccionada. 

Sumando lo anterior, en el cuerpo de la guitarra, en la parte de arriba a la derecha esta un switch para el [efecto ghost](#efecto-ghost). Al hacer hover, se cambiará el color a azul igual que las cuerdas. Una vez seleccionado, los focos de la imagen en la parte inferior izquierda cambiarán, haciendo alusión a que los focos están prendidos. Una vez *"prendido"* el efecto, el uso es igual al de las cuerdas, al seleccionar una cuerda esta emitirá un sonido con el efecto ghost. 

En la parte inferior del centro en el cuerpo de la guitarra, hay dos perillas para el [cambio del volumen](#cambio-de-volumen). El funcionamiento es similar a los elementos anteriores, cuando se seleccione la de perilla izquierda, esta cambiara a color rojo y la perilla derecha a verde. El nivel de volumen por default es 10, este se puede disminuir con la perrilla *roja* y se incremente con la perrilla *verde*. 


Para finalizar la parte frontal de la guitarra, tenemos el [cambio de fondo](#cambio-de-fondo) de la escena. En la parte superior izquierda se muestran *dos* botones, el primero (seleccionado por default) es un skybox de una caja metálica. Y el segundo es un fondo más simple de un tipo restaurante o bar. 

Y por último, 

---

### Modelo Final

https://user-images.githubusercontent.com/42215186/142253589-1fb0d69f-8c15-4c73-b247-c5c6abfe228f.mp4



### Interacción con Cuerdas
> Nota: activar el sonido del video para escuchar las cuerdas  
#### Uso: al hacer click en una cuerda, esta se iluminará de color azul para visualizar cual es con la que se esta interactuando. 

https://user-images.githubusercontent.com/42215186/142258519-3a163685-40a3-4139-b60d-baf428d2f146.mp4


### Efecto Ghost
> Nota: activar el sonido del video para escuchar el efecto en el sonido de las cuerdas
#### Uso: activar el switch de la guitarra y seleccionar una cuerda para escuchar su sonido con el efecto

https://user-images.githubusercontent.com/42215186/142260425-0fc5e240-5e66-44bd-a798-623b54edabb8.mp4


### Cambio de Volumen
> Nota: activar el sonido del video para escuchar el cambio de volumen
#### Uso: al hacer click en una de las perillas, la de color verde es para incrementar el nivel de volumen y la de color rojo para disminuirlo. 

https://user-images.githubusercontent.com/42215186/142261105-471ab42c-89d7-45be-8a37-4ab92f167e88.mp4


### Cambio de Fondo
#### Uso: al hacer click en una cuerda, esta se iluminará de color azul para visualizar cual es con la que se esta interactuando. 

https://user-images.githubusercontent.com/42215186/142259499-699dd026-28f1-4633-8220-78dae361c068.mp4


### Caja de Música 
#### Uso: al hacer click en una cuerda, esta se iluminará de color azul para visualizar cual es con la que se esta interactuando. 

https://user-images.githubusercontent.com/42215186/142265443-5bebb11d-9b2a-4d79-93ea-b75355cf8115.mp4

---

## Propuestas de Proyectos 
1. [Guitarras steampunk](https://i.pinimg.com/736x/b7/28/1f/b7281f9481e5bcf81d1b558bc6263652.jpg)
![alt text](https://i.pinimg.com/originals/d4/71/d8/d471d8038a28f27d093f4ff37bb40f0b.jpg)
![alt text](https://i.pinimg.com/736x/b7/28/1f/b7281f9481e5bcf81d1b558bc6263652.jpg "Guitar")

![alt text](https://images-ext-1.discordapp.net/external/Y6Xw2CEsNbUKgJM9zD-SubOhs5OVVt_jXH1F_P7Em5Q/https/damassets.autodesk.net/content/dam/autodesk/www/solutions/3d-cad-software/fy17-autocad-guitar-hero-image-1006x484.jpg?width=1144&height=550)

  - [Cuerdas](https://www.musicca.com/es/guitarra)
  - [Caja de musica](https://m.media-amazon.com/images/I/61f5iMhhWoL._AC_SX466_.jpg)

2. [Partes de un Objeto (experiencia audiovisual o tour)](https://farfromhere.emmitfenn.com)

![alt text](https://i.pinimg.com/736x/38/31/f6/3831f6738e0dbc04d341ec7ef94790a7.jpg)


3. [Ciudad en 3D](https://codepen.io/vcomics/pen/aGmoae)

![alt text](https://thumbs.dreamstime.com/b/ciudad-3d-13420756.jpg)

## Requerimientos funcionales a resolver:
### Bocetos: 
![alt text](https://github.com/ChristopherMiranda00/Proyecto-Graficas/blob/5ccbc3eaa480e42ebef9c88c2d08c1354c02d479/media/guitarra.jpg)

![alt text](https://github.com/ChristopherMiranda00/Proyecto-Graficas/blob/0db37d5d836c738910f4edef27422f67fc402973/media/guitarra2.jpg)

### Requerimientos:
A. Muestra la parte de atras, en donde habrá un interruptor o botón para brindar mayor interacción con el usuario. Este al ser activado, sonará una pequeña parte de alguna canción famosa.  

B. Pequeño engrane o tuerca, la cual será utilizada para darle "cuerda" a la guitarra para que emita el sonido.

C. Distorsión de Sonido TBD, esta función agregaría una distorsión al sonido de las cuerdas de la guitarra. 

D. Cuerdas, estás simularían una guitarra real, ya que el usuario puede interactuar con ellas y estás emitirían el sonido a corde a la cuerda seleccionada. 

E. Interruptor o botón para brindar mayor interacción con el usuario atrás de la guitarra "escondido" . Este al ser activado, sonará una pequeña parte de alguna canción famosa.  

F. Cámara, se puede mover la perspectiva de la guitarra. 

--- 
### Avances Primer Entrega:
- En este avance se cargaron los modelos a utlizar para la funcionalidad y decoración. 
- Se cargaron los sonidos de las cuerdas (carpeta de sounds). 
- Se cargo el modelo base de la guitarra y se programó la interacción con las cuerdas. Al tocarlas reproducen los sonidos cargados


En la imagen a continuación se muestran los avances anteriormente mencionados y las cosas faltantes para concluir nuestro proyecto: 

![alt text](https://github.com/ChristopherMiranda00/Proyecto-Graficas/blob/main/media/AvancesGuitarra.png)
