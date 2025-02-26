import { Component } from '@angular/core';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent {
  tabs: string[] = [
    'Noticias destacadas',
    'Inmobiliario',
    'Finanzas',
    'Vacacional',
    'Deco',
  ];
  activeTab: string = this.tabs[0];

  newsData = {
    'Noticias destacadas': [
      {
        title: 'El mercado inmobiliario en auge',
        description: 'Rozados: "La oferta de alquiler en Argentina se ha multiplicado por más de 12 tras derogarse el control de precios"',
        image: '../../assets/img/noticias/jose_rozados_portada.jpg',
        link: 'https://www.idealista.com/news/inmobiliario/internacional/2025/02/18/832201-rozados-el-alquiler-en-argentina-se-ha-multiplicado-por-mas-de-12-tras',
      },
      {
        title: 'Suben los precios de la vivienda',
        description: 'Collboni reaviva la polémica del 30%: niega perdón de multas y amplía casos sancionables',
        image: '../../assets/img/noticias/collboni.jpg',
        link: 'https://www.idealista.com/news/inmobiliario/vivienda/2025/02/18/832648-collboni-reaviva-la-polemica-del-30-niega-perdon-de-multas-y-amplia-casos',
      },
      {
        title: 'Nuevas normativas para alquileres',
        description: 'Térmica Beach, las viviendas de lujo que sí atraen al cliente nacional a la Costa del Sol',
        image: '../../assets/img/noticias/fachada_al_mar_del_proyecto_termica_beach_que_promueve_aedas_homes_con_ginkgo_en_malaga_capital.jpg',
        link: 'https://www.idealista.com/news/inmobiliario/vivienda/2025/02/18/832599-termica-beach-las-viviendas-de-lujo-que-si-atraen-al-cliente-nacional-en-la-costa',
      },
    ],
    Inmobiliario: [
      {
        title: 'Las ciudades con más demanda',
        description: 'Mango Home abre su primera tienda física en la Diagonal, en la ‘milla de oro’ de la decoración de Barcelona',
        image: '../../assets/img/noticias/ngn_0534_1.jpg',
        link: 'https://www.idealista.com/news/inmobiliario/retail/2025/02/20/833260-mango-home-abre-su-primera-tienda-fisica-en-la-diagonal-en-la-milla-de-oro-de-la',
      },
      {
        title: 'Construcción sostenible',
        description: 'Allen Sanginés-Krause crea una socimi de viviendas de lujo en alquiler',
        image: '../../assets/img/noticias/20250226084550.jpg',
        link: 'https://www.idealista.com/news/inmobiliario/vivienda/2025/02/20/832889-allen-sangines-krause-crea-una-socimi-de-viviendas-de-lujo-en-alquiler',
      },
      {
        title: 'Hipotecas más accesibles',
        description: 'El Gobierno ultima la licitación de más de 1.600 viviendas públicas a través de la empresa estatal',
        image: '../../assets/img/noticias/20250225192059.jpg',
        link: 'https://www.idealista.com/news/inmobiliario/vivienda/2025/02/20/833224-el-gobierno-ultima-la-licitacion-de-mas-de-1-600-viviendas-publicas-a-traves-de-la',
      },
    ],
    Finanzas: [
      {
        title: 'Estrategias de inversión en bienes raíces',
        description: 'El interés medio de las nuevas hipotecas ya se sitúa por debajo del 3%',
        image: '../../assets/img/noticias/20250225191814.jpg',
        link: 'https://www.idealista.com/news/finanzas/hipotecas/2025/02/20/833266-el-interes-medio-de-las-nuevas-hipotecas-ya-se-situa-por-debajo-del-3',
      },
      {
        title: 'Impacto de las tasas de interés',
        description: 'La hipoteca fija de Unicaja ahora es más barata: las condiciones de la nueva oferta',
        image: '../../assets/img/noticias/jqlqb-evoluci-n-del-gasto-en-pensiones-en-espa-a-.png',
        link: 'https://www.idealista.com/news/finanzas/hipotecas/2024/10/17/820556-unicaja-deja-su-hipoteca-fija-por-debajo-del-3-para-primeras-y-segundas-residencias',
      },
      {
        title: 'Créditos hipotecarios en 2024',
        description: 'Rodríguez: la vivienda social ha pasado del 2,5% al 3,4% del total, con 162.000 pisos más',
        image: '../../assets/img/noticias/20250224121140.jpg',
        link: 'https://www.idealista.com/news/finanzas/economia/2025/02/20/833216-rodriguez-la-vivienda-social-ha-pasado-del-2-5-al-3-4-del-total-con-162-000-pisos-mas',
      },
    ],
    Vacacional: [
      {
        title: 'Las mejores casas rurales',
        description: 'Ni España, ni Grecia ni Italia: esta es la mejor isla de Europa según Lonely Planet',
        image: '../../assets/img/noticias/the_rebel_2024_high-res-gevel_1_copiar.jpg',
        link: 'https://www.idealista.com/news/vacacional/destinos-turisticos/2025/02/19/833108-ni-espana-ni-grecia-ni-italia-esta-es-la-mejor-isla-de-europa-segun-lonely',
      },
      {
        title: 'Tendencias en alquiler vacacional',
        description: 'Cuevas de Zugarramurdi: el refugio de las brujas',
        image: '../../assets/img/noticias/villaviciosa_de_cordoba_1.jpg',
        link: 'https://www.idealista.com/news/vacacional/destinos-turisticos/2025/02/19/832960-cuevas-de-zugarramurdi-el-refugio-de-las-brujas',
      },
      {
        title: 'Invertir en propiedades vacacionales',
        description: '¿Dónde viajar en marzo en España? 9 destinos que no te puedes perder',
        image: '../../assets/img/noticias/dsc03605-santmedir.jpg',
        link: 'https://www.idealista.com/news/vacacional/destinos-turisticos/2025/02/19/832613-donde-viajar-en-marzo-en-espa%C3%B1a-9-destinos-que-no-te-puedes-perder',
      },
    ],
    Deco: [
      {
        title: 'Ideas para renovar tu hogar',
        description: 'Se vende una lujosa villa en las colinas de Cala Mastella: estilo ibicenco y moderno con vistas al mar',
        image: '../../assets/img/noticias/lifestyle-people-living-boho-interiors.jpg',
        link: 'https://www.idealista.com/news/deco/casas-de-ensueno/2025/02/20/832972-se-vende-una-lujosa-villa-en-las-colinas-de-cala-mastella-estilo-ibicenco-y-moderno',
      },
      {
        title: 'Colores en tendencia',
        description: 'Se vende uno de los áticos más altos del mundo por 51 millones de dólares',
        image: '../../assets/img/noticias/renovar_cocina_2025-isla.jpg',
        link: 'https://www.idealista.com/news/deco/casas-de-ensueno/2025/02/20/832614-se-vende-uno-de-los-aticos-mas-altos-del-mundo-por-51-millones-de-dolares',
      },
      {
        title: 'Planta de jade: ¿cómo cuidarla para disfrutar de sus beneficios?',
        description: 'Cómo lograr un estilo limpio y moderno.',
        image: '../../assets/img/noticias/pexels-andras-denes-893718-5035876_1.jpg',
        link: 'https://www.idealista.com/news/deco/estancias/2025/02/19/833055-planta-de-jade-como-cuidarla-para-disfrutar-de-sus-beneficios',
      },
    ],
  };

  get filteredNews() {
    return this.newsData[this.activeTab as keyof typeof this.newsData];
  }

  selectTab(tab: string) {
    this.activeTab = tab;
  }
}
