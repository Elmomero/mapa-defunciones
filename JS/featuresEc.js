import defunciones from '../data/defunciones.js'
import statesData from '../data/EcuadorStates.js'
let features = statesData.features;
features.map(({properties})=>{
    delete properties.dpa_provin;
    delete properties.dpa_despro;
    delete properties.dpa_valor;
    delete properties.dpa_anio;
    delete properties.rei_codigo;
    delete properties.ren_codigo;
    delete properties.pee_codigo;
    delete properties.codigo;
    delete properties.codigo_1;
    delete properties.pob_mas;
    delete properties.pob_fem;
    delete properties.si_lee;
    delete properties.no_lee;
    delete properties.total;
    delete properties.analfabeti;
    delete properties.promedio_e;
    delete properties.pobres_nbi;
    delete properties.no_pobres;
    delete properties.pob_nopob_;
    delete properties.pobres_nbi;
    delete properties.cartodb_id;
    delete properties.updated_at;
    delete properties.created_at;
});
features.map(({properties:provinceData})=>{
    defunciones.map((prov)=>{
        let provinc = provinceData.nombre.toLowerCase().trim();
        let reg = prov.Region.toLowerCase().trim();
        if(provinc == reg){
            provinceData.anios = prov;          
        }    
    })
});
export{
    features as default,
}







