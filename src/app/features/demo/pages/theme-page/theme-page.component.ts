import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-theme-page',
  templateUrl: './theme-page.component.html',
  styleUrls: ['./theme-page.component.css']
})

export class ThemePageComponent  {
constructor() { }

  titulo:string='Demo';
  /**En este ejemplo, hemos creado en el html una referencia local llamada prueba al <ng-template>. Luego, en el componente, usamos @ViewChild para obtener una referencia a esa referencia en nuestro código. Ahora que tenemos una referencia a esta plantilla, podemos crear nuevas vistas a partir de ella.
   * 'prueba' es como he llamado a mi ng-template en el html  (#prueba)
   * miPrueba es como se llamara mi referencia para usar en mi componente.ts
   */
  @ViewChild('prueba')
  miPrueba!: TemplateRef<any>;

@ViewChild('sitio',{read:ViewContainerRef}) container!: ViewContainerRef;
/**método que he hecho de prueba, me crea una vista cada vez, en el sitio donde esté el container ref del html 
 * container es la referencia de sitio
*/
mostrarPlantilla(){
  this.container.createEmbeddedView(this.miPrueba)
}
}


/**
 * TemplateRef es una clase fundamental en Angular que se usa para referirse a una plantilla. Una "plantilla"  es esencialmente una sección de HTML en tu aplicación que puedes usar para crear vistas. El elemento <ng-template> en Angular es un elemento que se usa para declarar una plantilla.

Cuando se usa un TemplateRef, usualmente se asocia con un elemento <ng-template>. Cuando Angular ve un <ng-template>, lo convierte en un objeto TemplateRef.

<ng-template> es un elemento especial en Angular que te permite declarar una plantilla. La plantilla no se renderiza por sí misma. Piensa en ella como un modelo o un molde que puede usarse para crear o renderizar partes de la interfaz de usuario.

Todo lo que está dentro del elemento <ng-template> forma parte de la plantilla. Esto puede ser cualquier cosa que sería válido en HTML normalmente, como elementos de texto, otros elementos de HTML, e incluso otros componentes de Angular.

El uso de #prueba es lo que se llama una referencia de plantilla, esencialmente es una forma de ponerle nombre a tu plantilla para que puedas referenciarla en otra parte de tu código. En este caso, prueba es el nombre de la referencia de la plantilla.

Para utilizar el contenido dentro de <ng-template>, debes instanciar una vista a partir de la plantilla utilizando el método createEmbeddedView() de un ViewContainerRef.
En este caso, para container, estás pasando un segundo argumento a @ViewChild que es { read: ViewContainerRef }. Esto le dice a Angular que quieres obtener ViewContainerRef para este elemento, no simplemente el elemento en sí mismo.

Una vez que tienes estas referencias, puedes usar ViewContainerRef.createEmbeddedView() para instanciar la plantilla y adjuntar la vista al contenedor:

Cuando tienes un <ng-template>, su contenido no se renderiza de inmediato en la página, independientemente de su ubicación en tu código HTML. Angular trata el <ng-template> como una plantilla para crear vistas, pero no una vista en sí misma que debería ser renderizada.

A pesar de que el <ng-template> está en medio de tu mat-card-content, no se verá nada de su contenido en la página hasta que explícitamente crees una vista desde esa plantilla y la insertes en el DOM.

La razón por la que necesitas especificar el contenedor (a través de ViewContainerRef) tiene que ver con cómo Angular gestiona el renderizado de las vistas.

Aunque el <ng-template> esté ubicado en una posición específica en tu archivo HTML, Angular no renderizará automáticamente el contenido de la plantilla en esa ubicación específica. La razón es que <ng-template> no es una vista por sí misma, sino una plantilla para crear vistas.

Cuando creas una vista a partir de una plantilla utilizando createEmbeddedView(), estás creando una nueva instancia de una vista, pero Angular todavía necesita saber dónde colocar esa vista en el DOM. No asume automáticamente que debe ir en el mismo lugar que el <ng-template> original.

Así que incluso si tienes tu <ng-template> en un lugar específico en tu código HTML, aún necesitas decirle a Angular dónde colocar la vista que creas a partir de la plantilla. Haces esto obteniendo una referencia a un ViewContainerRef que apunte al lugar donde quieres insertar la vista, y luego utilizando createEmbeddedView() en ese ViewContainerRef.

 */