import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import FileInputComponent from './FileInputComponent'; // Update the path accordingly
import { baseApi } from '../../constants';
import axios, { all } from 'axios';

function ShopView() {

  const [modelcntvalue, setmodelcntvalue] = useState(1);
  const [selectedFile, setSelectedFile] = useState<any>(null);


  // const [fullImages, setFullImages] = useState("");
  // const updateFullImages = (images: string) => {
  //   setFullImages(images);

  // };
  const naziv_artikla_Ref = useRef<HTMLInputElement>(null);
  const jedinica_mere_Ref = useRef<HTMLInputElement>(null);
  const kategorija_artikla_Ref = useRef<HTMLInputElement>(null);
  const transportno_pakovanje_Ref = useRef<HTMLInputElement>(null);
  const potkategorija_Ref = useRef<HTMLInputElement>(null);
  const minimalno_pakovanje_Ref = useRef<HTMLInputElement>(null);
  const meta_description_Ref = useRef<HTMLInputElement>(null);
  const kvadratura_Ref = useRef<HTMLInputElement>(null);
  const prosireni_opis_Ref = useRef<HTMLInputElement>(null);
  const sertifikat_Ref = useRef<HTMLInputElement>(null);
  const sirina_Ref = useRef<HTMLInputElement>(null);


  const tezina_Ref = useRef<HTMLInputElement>(null);
  const visina_Ref = useRef<HTMLInputElement>(null);
  const debljina_Ref = useRef<HTMLInputElement>(null);
  const duljina_Ref = useRef<HTMLInputElement>(null);
  const sastav_Ref = useRef<HTMLInputElement>(null);
  const boja_Ref = useRef<HTMLInputElement>(null);
  const tip_otpornosti_Ref = useRef<HTMLInputElement>(null);
  const mesto_i_nacin_skladistenja_Ref = useRef<HTMLInputElement>(null);
  const count_Ref = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const allElements: any = document.getElementsByTagName('input')
    const arrayCode: any = [];
    const arrayModel: any = [];
    for (var i = 0; i < allElements.length; i++) {
      if (allElements[i].id && allElements[i].id.indexOf('sifra_proizvoda') == 0) {
        arrayCode.push(allElements[i].value)
      }
      if (allElements[i].id && allElements[i].id.indexOf('naziv_proizvoda_model') == 0) {
        arrayModel.push(allElements[i].value)
      }
    }
    try {
      const token: string | null = localStorage.getItem('accessToken');
      if (token) {
        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        };

        const formData = new FormData();

        //formData.append('file', selectedFile);

        for (let index = 0; index < selectedFile?.length; index++) {
          const file = selectedFile[index];
          formData.append(`files`, file); // Append each file with a unique key
        }

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const body: any = {
          polje_id: "/",
          varijacije: "/",
          stiker: "/",

          garancija: "/",
          tehnicki_crtez: "/",
          model_vise_slika: "FALSE",
          dimenzije_pakovanja: "/",
          mesta_primene: "/",
          nacin_ugradnje: "/",
          zapremina: "/",
          precnik: "/",
          rok_trajanja: "/",
          dodatne_napomene: "/",
        }
        body.url = '/' + uniqueSuffix;

        for (const key in body) {
          formData.append(key, (body[key]));

        }
        formData.append('sifra_proizvoda', JSON.stringify(arrayCode))
        formData.append('naziv_proizvoda_model', JSON.stringify(arrayModel))

        formData.forEach((value, key) => {
          console.log(value)
        });
        formData.append('naziv_artikla', naziv_artikla_Ref.current?.value || '/');
        formData.append('jedinica_mere', jedinica_mere_Ref.current?.value || '/');
        formData.append('kategorija_artikla', kategorija_artikla_Ref.current?.value || '/');
        formData.append('transportno_pakovanje', transportno_pakovanje_Ref.current?.value || '/');
        formData.append('potkategorija', potkategorija_Ref.current?.value || '/');
        formData.append('minimalno_pakovanje', minimalno_pakovanje_Ref.current?.value || '/');
        formData.append('meta_description', meta_description_Ref.current?.value || '/');
        formData.append('kvadratura', kvadratura_Ref.current?.value || '/');
        formData.append('prosireni_opis', prosireni_opis_Ref.current?.value || '/');
        formData.append('sertifikat', sertifikat_Ref.current?.value || '/');
        formData.append('sirina', sirina_Ref.current?.value || '/');
        formData.append('tezina', tezina_Ref.current?.value || '/');
        formData.append('visina', visina_Ref.current?.value || '/');
        formData.append('debljina', debljina_Ref.current?.value || '/');
        formData.append('duljina', duljina_Ref.current?.value || '/');
        formData.append('sastav', sastav_Ref.current?.value || '/');
        formData.append('boja', boja_Ref.current?.value || '/');
        formData.append('tip_otpornosti', tip_otpornosti_Ref.current?.value || '/');
        formData.append('mesto_i_nacin_skladistenja', mesto_i_nacin_skladistenja_Ref.current?.value || '/');
        formData.append('count', count_Ref.current?.value || '/');

        formData.append('potkategorija_lista', potkategorija_Ref.current?.value || '/');


        if (selectedFile === null || formData.get('naziv_artikla') === "/" || formData.get('count') === "0") {
          alert("ERROR");
        }
        else {
          return await axios.post(`${baseApi}/products/createProduct`, formData, header).then(res => {
            alert("Created Successfully");
            return res.data.data;
          })
            .catch(err => {

            });

        }
      }
    }
    catch (error) {

      console.error('Error create new product:', error);
    }
  };

  function cnthandlechange(value: number) {
    setmodelcntvalue(value);
  }
  const handleFileChange = (event: any) => {
    console.log(event.target.files)
    setSelectedFile(event.target.files);
  };


  return (
    <div className="container">
      <div className="page-header__title" style={{ marginLeft: '0px' }}>
        <h1 style={{ marginTop: '0px', marginBottom: '30px', fontWeight: '700' }}>
          Dodaj proizvod
        </h1>
        {/* <div style={{ fontSize: "12pt", alignItems: 'center' }}>
          <FileInputComponent updateFullImages={updateFullImages} />
        </div> */}


        <input type="file" accept=".webp" onChange={handleFileChange} multiple />

        <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}>
          <div style={{ fontSize: "12pt", alignItems: 'center', width: '50%' }}>
            <label>item_name*</label><input type="text" id='naziv_artikla' name='item_name' ref={naziv_artikla_Ref} />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center', display: 'none', width: '50%' }}>
            <label>images</label><input type="text" value={JSON.stringify(selectedFile)} readOnly />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center', width: '50%' }}>
            <label>unit_of_measure</label><input type="text" id='jedinica_mere' ref={jedinica_mere_Ref} />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center', width: '50%' }}>
            <label>item_category*</label><input type="text" id='kategorija_artikla' ref={kategorija_artikla_Ref} />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center', width: '50%' }}>
            <label>transport_packaging</label><input type="text" id='transportno_pakovanje' ref={transportno_pakovanje_Ref} />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center', display: 'flex', width: '50%' }}>
            <label>subcategory</label><input type="text" id='potkategorija' ref={potkategorija_Ref} />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center', display: 'none', width: '50%' }}>
            <label>subcategory_list</label><input type="text" id='subcategory_list' />
          </div>



          <div style={{ fontSize: "12pt", alignItems: 'center', width: '50%' }}>
            <label>minimum_pack</label><input type="text" id='minimalno_pakovanje' ref={minimalno_pakovanje_Ref} />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center', display: 'flex', width: '50%' }}>
            <label>meta_description</label><input type="text" id='meta_description' ref={meta_description_Ref} />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center', width: '50%' }}>
            <label>square footage</label><input type="text" id='kvadratura' ref={kvadratura_Ref} />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center', display: 'flex', width: '50%' }}>
            <label>extended_description</label><input type="text" id='prosireni_opis' ref={prosireni_opis_Ref} />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center', width: '50%' }}>
            <label>certificate</label><input type="text" id='sertifikat' ref={sertifikat_Ref} />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center', width: '50%' }}>
            <label>modelcnt*</label><input type="number" min="1" max="10" defaultValue={1} onChange={(e) => { cnthandlechange(Number(e.target.value)) }} />
          </div>

          <div style={{ fontSize: "12pt", alignItems: 'center', width: '50%' }}>
            <label>width</label><input type="text" id='sirina' ref={sirina_Ref} />
          </div>

          <div style={{ fontSize: "12pt", alignItems: 'center', display: "flex", flexDirection: "row", width: '50%' }}>
            <label>product_code*</label>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[...Array(Number(modelcntvalue))].map((_, index) => (
                <div key={index}>
                  <input type="text" id={'sifra_proizvoda' + index} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ fontSize: "12pt", alignItems: 'center', width: '50%' }}>
            <label>weight</label><input type="text" id={'tezina'} ref={tezina_Ref} />
          </div>

          <div style={{ fontSize: "12pt", alignItems: 'center', display: "flex", flexDirection: "row", width: '50%' }}>
            <label>product_name_model*</label>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[...Array(Number(modelcntvalue))].map((_, index) => (
                <div key={index}>
                  <input type="text" id={'naziv_proizvoda_model' + index} />
                </div>
              ))}
            </div>
          </div>


          <div style={{ fontSize: "12pt", alignItems: 'center', width: '50%' }}>
            <label>height</label><input type="text" id='visina' ref={visina_Ref} />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center', width: '50%' }}>
            <label>thickness</label><input type="text" id='debljina' ref={debljina_Ref} />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center', width: '50%' }}>
            <label>length</label><input type="text" defaultValue={0} id='duljina' ref={duljina_Ref} />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center', width: '50%' }}>
            <label>composition</label><input type="text" id='sastav' ref={sastav_Ref} />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center', width: '50%' }}>
            <label>color</label><input type="text" id='boja' ref={boja_Ref} />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center', width: '50%' }}>
            <label>resistance_type</label><input type="text" id='tip_otpornosti' ref={tip_otpornosti_Ref} />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center', width: '50%' }}>
            <label>place_and_method_of_storage</label><input type="text" id='mesto_i_nacin_skladistenja' ref={mesto_i_nacin_skladistenja_Ref} />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center', width: '50%' }}>
            <label>count*</label><input type="number" defaultValue={0} id='count' ref={count_Ref} />
          </div>
        </div>
        <div style={{ display: 'none' }}>
          <div style={{ fontSize: "12pt", alignItems: 'center', display: "flex", flexDirection: "row" }}>
            <label>ancestor</label><input type="text" id={'ancestor'} />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center' }}>
            <label>lifetime</label><input type="text" id='lifetime' />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center' }}>
            <label>prateca_oprema_dodaci</label><input type="text" id='prateca_oprema_dodaci' />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center' }}>
            <label>additional_notes</label><input type="text" id='additional_notes' />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center' }}>
            <label>----------CUSTOMIZE----------</label>
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center' }}>
            <label>sticker</label><input type="text" id='sticker' />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center' }}>
            <label>variation</label><input type="text" id='variation' />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center' }}>
            <label>url</label><input type="text" id='url' />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center' }}>
            <label>----------RANDOM----------</label>
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center' }}>
            <label>field_id</label><input type="text" id='field_id' />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center' }}>
            <label>qr_kod</label><input type="text" id='qr_kod' />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center' }}>
            <label>----------DEFAULT VALUE----------</label>
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center' }}>
            <label>guarantee</label><input type="text" id='guarantee' />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center' }}>
            <label>technical drawing</label><input type="text" id='technical_drawing' />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center' }}>
            <label>model_more_images</label><input type="text" defaultValue={'FALSE'} id='model_more_images' />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center' }}>
            <label>package_dimensions</label><input type="text" id='package_dimensions' />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center' }}>
            <label>application_places</label><input type="text" id='application_places' />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center' }}>
            <label>installation_mode</label><input type="text" id='installation_mode' />
          </div>
          <div style={{ fontSize: "12pt", alignItems: 'center' }}>
            <label>volume</label><input type="text" id='volume' />
          </div>
        </div>
        <button onClick={handleSubmit}> Add Product</button>
      </div>
    </div>
  );
}

export default ShopView;
