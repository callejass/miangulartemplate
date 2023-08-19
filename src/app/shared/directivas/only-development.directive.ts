import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";
import { environment } from "src/environments/environment";

@Directive({
  selector: "[appOnlyDevelopment]",
})
export class OnlyDevelopmentDirective implements OnInit {

  /**
   * Necesito inyectarlos porque la directiva no tiene una plantilla propia 
   * y no puedo acceder a ellos a traves de @viewchild como en loso componentes,
   *  que si tienen plantilla propia
   * @param templateRef 
   * @param viewContainer 
   */
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
  
ngOnInit(): void {
  console.log(environment.production)
  if (!environment.production)  {
    this.viewContainer.createEmbeddedView(this.templateRef);
  } else{
    this.viewContainer.clear();
  }
}
}









/**
 * En Angular, los archivos de entorno se utilizan para configurar variables de entorno específicas para diferentes modos de tu aplicación, como desarrollo, producción, pruebas, etc. Por lo general, encontrarás al menos dos archivos de entorno en el directorio src/environments de un proyecto Angular:

environment.ts: Se utiliza para la configuración del entorno de desarrollo.
environment.prod.ts: Se utiliza para la configuración del entorno de producción.
 * 
 */























/**
 * Un componente representa una vista con su propia plantilla y controlador de lógica de negocio. Un componente tiene un ciclo de vida completo, incluyendo su propio contexto de datos y lógica. Cuando utilizas TemplateRef y ViewContainerRef dentro de un componente, puedes obtenerlos a través de @ViewChild porque son parte de la plantilla del componente.

Por otro lado, una directiva es diferente. No tiene una plantilla propia. En cambio, se aplica a elementos dentro de las plantillas de otros componentes. Una directiva está destinada a añadir comportamiento a los elementos del DOM en los que se aplica, y no tiene un contexto propio.

Cuando se crea una directiva estructural como *ngIf o *ngFor, necesitas tener acceso a la plantilla y al contenedor de la vista en la que se aplica la directiva. Pero debido a que la directiva no tiene una plantilla propia, no puedes utilizar @ViewChild para obtener estos.

En lugar de eso, Angular te permite inyectar TemplateRef y ViewContainerRef directamente en el constructor de la directiva. Cuando Angular crea una instancia de la directiva, se encarga de proporcionar las referencias correctas basadas en el elemento al que se aplica la directiva.
 */
