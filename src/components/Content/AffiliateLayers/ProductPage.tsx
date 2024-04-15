import './ProductPage.css';
import React, { useEffect, useRef, useState } from 'react';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import {
  Row,
  Tabs,
  TabsProps,
} from 'antd';
import { Button, Radio, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useBreadCrumbsUpdateContext } from './Context/BreadCrumbsContext';

//import products from './EditLayer/products.json';

import 'react-photoswipe/lib/photoswipe.css';
import ProductCard from './ProductCard/ProductCard';
import { CopyToClipboard, getImagePath } from '../../../hooks/helpers';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import 'react-image-gallery/styles/css/image-gallery.css';

import icon_viber from '../../../assets/icons/VIBER.webp';
import icon_facebook from '../../../assets/icons/FACEBOOK.webp';
import icon_messenger from '../../../assets/icons/MESSENGER.webp';
import icon_email from '../../../assets/icons/EMAIL.webp';
import icon_copy from '../../../assets/icons/COPY LINK.webp';

import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/plugins/counter.css';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import { preventImgRightClick } from '../../../helpers/helpers';
import { composite_categories, subCategoryLocalStorageList } from './EditLayer/StorePage';
import { Helmet } from "react-helmet";
import { baseApi } from '../../../constants';
import axios, { AxiosResponse } from 'axios';


export interface Product {
  polje_id: string;
  sifra_proizvoda: string | Array<string>;
  naziv_artikla: string;
  naziv_proizvoda_model: string | Array<string>;
  varijacije: Array<string>;
  meta_description: string;
  prosireni_opis: string;
  jedinica_mere: string;
  kategorija_artikla: string;
  potkategorija: string;
  minimalno_pakovanje: string;
  transportno_pakovanje: string | Array<string>;
  zapremina: string;
  kvadratura: string;
  sirina: string;
  duzina: string;
  visina: string;
  precnik: string;
  debljina: string;
  tezina: string;
  sastav: string;
  boja: string;
  tehnicki_crtez: string;
  tip_otpornosti: string;
  garancija: string;
  rok_trajanja: string;
  sertifikat: string;
  mesto_i_nacin_skladistenja: string;
  dimenzije_pakovanja: string;
  prateca_oprema_dodaci: string;
  dodatne_napomene: string;
  mesta_primene: string;
  nacin_ugradnje: string;
  stiker: string | string[];
  qr_kod: string;
  slike: string | Array<string>;
  url: string;
  model_vise_slika: string;
}

interface DataType {
  key: React.Key;
  name: string;
  affiliate: string;
  layerType: string;
  color: JSX.Element;
  actions: JSX.Element;
}

const startingHistory = [
  'L1NDA Planner',
  'Domain Settings',
  'Affiliate layers',
];

type DataIndex = keyof DataType;

function ProductPage() {
  const routeHistoryUpdate = useBreadCrumbsUpdateContext();

  const setDimensionIndex = (e: any) => {
    if (product.dimenzije_pakovanja) {
      const index = Number(e.target.id);
      setDimensionChosen(index);
      window.location.hash = product?.sifra_proizvoda[index];
      const newImage = document.querySelector(
        `#${product.sifra_proizvoda[index]}`
      ) as HTMLDivElement;
      const oldImage = document.querySelectorAll(
        '.divProductImgSelectedThumbnail'
      );
      const showCase = document.querySelector(
        '#productShowcaseImage'
      ) as HTMLImageElement;
      // console.log('model chane:', e.target, newImage, oldImage, showCase);
      oldImage.forEach(oldImg => oldImg.classList.remove('divProductImgSelectedThumbnail'));
      if (oldImage && newImage) {
        // newImage.classList.add('divProductImgSelectedThumbnail');
        showCase.src = (
          newImage.childNodes[0].childNodes[0] as HTMLImageElement
        ).src;
      }
    }
  };

  const [showShare, setShowShare] = useState<boolean>(false);

  const [dimensionChosen, setDimensionChosen] = useState<number>(0);
  const [showFirmTip, setShowFirmTip] = useState<boolean>(false);
  const [showPersonTip, setShowPersonTip] = useState<boolean>(false);
  const [showShipmentTip, setShowShipmentTip] = useState<boolean>(false);

  const [productsList, setProductList] = useState<Product[]>([]);//useState([]);//useState([...products]);

  const [product, setProduct] = useState<Product>({} as Product);

  const myRef = useRef<HTMLDivElement>(null);

  const executeScroll = () => {
    //console.log("first", myRef?.current)
    if (myRef?.current) {
      const y = myRef.current.offsetTop;
      const x = myRef.current.offsetLeft;
      //console.log("first2", myRef?.current,x, y)
      window.scrollTo({ top: y - 100, left: x, behavior: "smooth" })
      //  myRef.current.scrollTo({ behavior: 'smooth'});//.scrollIntoView({ behavior: 'smooth', block: 'start' });   
    }
  }
  const fetchProducts = async () => {
    try {
      const token: string | null = localStorage.getItem('accessToken');
      if (token) {

        return await axios.get(`${baseApi}/products/getProducts`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }).then(res => {
          return res.data.data;
          console.log("------------FETCHIED DATA------");
          console.log(res.data.data);
        })
          .catch(err => {

          });
      }
    } catch (error) {

      console.error('Error fetching products:', error);
    }
  };
  useEffect(() => {

    window.scrollTo(0, 0);

    window.addEventListener('click', (e: any) => {

      if (!e.target.classList.contains('divProductActionQuantityText')) {
        setShowFirmTip(false);
        setShowPersonTip(false);
      }
      if (!e.target.classList.contains('spanTroskoviIsporuke')) {
        setShowShipmentTip(false);
      }
      if (!e.target.classList.contains('productPageShareIconLabelButton')) {
        setShowShare(false);
      }
    });

    const btn_left = document.getElementById('btn-left'),
      btn_right = document.getElementById('btn-right'),
      btn_left2 = document.getElementById('btn-left2'),
      btn_right2 = document.getElementById('btn-right2'),
      content = document.querySelector('.divProductScrollContainer'),
      content2 = document.querySelector('.divProductScrollContainer2');
    // console.log(btn_left, btn_right, content, content2)
    if (content && btn_left && btn_right && btn_left2 && btn_right2 && content2) {
      const content_scroll_width = content.scrollWidth;
      let content_scoll_left = content.scrollLeft;

      const content2_scroll_width = content2.scrollWidth;
      let content2_scroll_left = content2.scrollLeft;
      btn_right.addEventListener('click', () => {
        // console.log("first right clicked", content_scoll_left, content_scroll_width)
        content_scoll_left += 150;
        if (content_scoll_left >= content_scroll_width) { content_scoll_left = content_scroll_width; }
        content.scrollLeft = content_scoll_left;
      });


      btn_left.addEventListener('click', () => {
        content_scoll_left -= 150;
        if (content_scoll_left <= 0) {
          content_scoll_left = 0;
        }
        content.scrollLeft = content_scoll_left;

      });

      btn_right2.addEventListener('click', () => {

        content2_scroll_left += 150;
        if (content2_scroll_left >= content2_scroll_width) { content2_scroll_left = content2_scroll_width; }
        content2.scrollLeft = content2_scroll_left;
      });


      btn_left2.addEventListener('click', () => {
        content2_scroll_left -= 150;
        if (content2_scroll_left <= 0) {
          content2_scroll_left = 0;
        }
        content2.scrollLeft = content2_scroll_left;
      });
    }
    preventImgRightClick();
    const imgs = document.querySelectorAll('img');
    imgs.forEach((img) => img.addEventListener('contextmenu', (e) => { e.preventDefault() }))
  }, []);

  useEffect(() => {
    fetchProducts().then(productlist => {
      setProductList(productlist);

      const indexSlash = window.location.pathname.lastIndexOf('proizvod/');
      const id = decodeURI(window.location.pathname.substring(indexSlash + 1 + 'proizvod'.length - 1));
      const product = productlist.find((product : Product) => product?.url === id);


      if (product) {
        document.title = product.naziv_artikla;
        // setTimeout(() => {
        setProduct(product as Product);
        if (!window.location.hash) {
          // window.location.hash = product?.sifra_proizvoda[dimensionChosen];
        } else if (Array.isArray(product.sifra_proizvoda)) {
          // const hashValue = window.location.hash.substring(1);
          const index = getDimensionIndex();
          //console.log("hashValue", index);
          setDimensionChosen(index);
        }
      }
    })
    // routeHistoryUpdate(["Početna", "Proizvodi", product?.name]);

    // }else{
    //   window.location.href = '/404';
    // }
    routeHistoryUpdate(['Početna', 'Proizvodi', product?.naziv_artikla]);
  }, [window.location]);

  const getDimensionIndex = () => {
    let index = 0
    if (product.sifra_proizvoda) {

      if (!window.location.hash) {
        // window.location.hash = product?.sifra_proizvoda[dimensionChosen];
      } else if (Array.isArray(product.sifra_proizvoda)) {
        const hashValue = window.location.hash.substring(1);
        index = product.sifra_proizvoda.indexOf(hashValue);
        //console.log("dimension index called", hashValue, index);
        //setDimensionChosen(index);
      }
    }
    return index;
  }

  useEffect(() => {
    //console.log("first call ", dimensionChosen)    
    window.onpopstate = e => {
      const index = getDimensionIndex();
      //console.log("hashValue2222", index);
      setDimensionChosen(index);
    };
  },);

  // INFO TOUR BEGIN


  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLSpanElement>(null);
  const ref3 = useRef<HTMLSpanElement>(null);

  // tabs section begin
  const onChange = (key: string) => {
    //console.log(key);
  };


  // tabs section end
  const hideBackToTop = (hide: boolean) => {
    const button = document.querySelector('#myBtn');
    (button as HTMLButtonElement).style.display = hide ? 'none' : 'flex';
  };
  const [openPhotoSwipe, setOpenPhotoSwipe] = useState<boolean>(false);
  const zoomImagePath = getImagePath(product as Product);

  const imagePath = getImagePath(product as Product);
  
  const imageSrc = `${baseApi}/assets/products/` + imagePath + '.webp';

  const handleProductImgThumbnailSelected = (e: any) => {
    const parent = document.querySelector('.small-products-images');
    const previous = document.querySelectorAll('.divProductImgSelectedThumbnail');
    previous.forEach(prev => prev.classList.remove('divProductImgSelectedThumbnail'));
    const divSelected = e as HTMLImageElement;
    divSelected.classList.add('divProductImgSelectedThumbnail');
    //console.log(previous, divSelected);
    const showCaseImg = document.querySelector(
      '#productShowcaseImage'
    ) as HTMLImageElement;
    if (showCaseImg) {
      showCaseImg.src = divSelected.src;
    }
  };


  useEffect(() => {
    setTimeout(() => {
      const wrapper = document.querySelector('.yarl__fullsize');
      //console.log('wrapper',wrapper);
      // setTimeout(() => {
      if (wrapper) {
        //console.log("binding event!!!")
        wrapper?.addEventListener('click', (e) => {
          const target = e.target as HTMLElement;
          //console.log(target, target.classList);

          if (target.classList.contains('yarl__slide_image')) {
            return
          }
          setOpenPhotoSwipe(false);
          //console.log("closed!!!");

        })
      }
    }, 100);
    // }, 2500);

  }, [openPhotoSwipe])

  const zoomRef: any = React.useRef(null);
  const thumbnailsRef: any = React.useRef(null);


  const SpecifikacijeJSX: TabsProps['items'] = [
    {
      forceRender: true,
      key: '1',
      label: <label id='Specifikacije' className=''>Specifikacije</label>,
      children: (
        <>
          <div className='product-tabs__content'>
            <h2 style={{ marginBottom: '30px', textAlign: 'left' }}>
              Specifikacije
            </h2>
            <div className='product-tabs__pane' id='tab-specification'>
              <div className='spec'>
                <div className='spec__section'>
                  <h4 className='spec__section-title'>Dimenzije</h4>
                  <div
                    className='spec__row'
                    style={{
                      display: product.zapremina === '/' ? 'none' : 'flex',
                    }}
                  >
                    <div className='spec__name'>Zapremina</div>
                    <div className='spec__value'>
                      {Array.isArray(product.zapremina)
                        ? product.zapremina[dimensionChosen]
                        : product.zapremina}
                    </div>
                  </div>
                  <div
                    className='spec__row'
                    style={{
                      display: product.kvadratura === '/' ? 'none' : 'flex',
                    }}
                  >
                    <div className='spec__name'>Kvadratura</div>
                    <div className='spec__value'>
                      {Array.isArray(product.kvadratura)
                        ? product.kvadratura[dimensionChosen]
                        : product.kvadratura}
                    </div>
                  </div>
                  <div
                    className='spec__row'
                    style={{
                      display: product.sirina === '/' ? 'none' : 'flex',
                    }}
                  >
                    <div className='spec__name'>Širina</div>
                    <div className='spec__value'>
                      {Array.isArray(product.sirina)
                        ? product.sirina[dimensionChosen]
                        : product.sirina}
                    </div>
                  </div>
                  <div
                    className='spec__row'
                    style={{
                      display: product.duzina === '/' ? 'none' : 'flex',
                    }}
                  >
                    <div className='spec__name'>Dužina</div>
                    <div className='spec__value'>
                      {Array.isArray(product.duzina)
                        ? product.duzina[dimensionChosen]
                        : product.duzina}
                    </div>
                  </div>
                  <div
                    className='spec__row'
                    style={{
                      display: product.visina === '/' ? 'none' : 'flex',
                    }}
                  >
                    <div className='spec__name'>Visina</div>
                    <div className='spec__value'>
                      {Array.isArray(product.visina)
                        ? product.visina[dimensionChosen]
                        : product.visina}
                    </div>
                  </div>
                  <div
                    className='spec__row'
                    style={{
                      display:
                        product.precnik === '/' || product.precnik === '//'
                          ? 'none'
                          : 'flex',
                    }}
                  >
                    <div className='spec__name'>Prečnik</div>
                    <div className='spec__value'>
                      {Array.isArray(product.precnik)
                        ? product.precnik[dimensionChosen]
                        : product.precnik}
                    </div>
                  </div>
                  <div
                    className='spec__row'
                    style={{
                      display: product.debljina === '/' ? 'none' : 'flex',
                    }}
                  >
                    <div className='spec__name'>Debljina</div>
                    <div className='spec__value'>
                      {Array.isArray(product.debljina)
                        ? product.debljina[dimensionChosen]
                        : product.debljina}
                    </div>
                  </div>
                  {product?.kategorija_artikla === "HIDROIZOLACIJA" && <div
                    className='spec__row'
                    style={{
                      display: product.tezina === '/' ? 'none' : 'flex',
                    }}
                  >
                    <div className='spec__name'>Težina</div>
                    <div className='spec__value'>
                      {Array.isArray(product.tezina)
                        ? product.tezina[dimensionChosen]
                        : product.tezina}
                    </div>
                  </div>}
                  {/* <div className="spec__row">
                      <div className="spec__name">Visina</div>
                      <div className="spec__value">{product.}</div>
                    </div> */}
                </div>

                <div className='spec__section'>
                  <h4 className='spec__section-title'>
                    Tehničke specifikacije
                  </h4>
                  <div
                    className='spec__row'
                    style={{
                      display: product.sastav === '/' ? 'none' : 'flex',
                    }}
                  >
                    <div className='spec__name'>Sastav</div>
                    <div className='spec__value'>
                      {Array.isArray(product.sastav)
                        ? product.sastav[dimensionChosen]
                        : product.sastav}
                    </div>
                  </div>
                  <div
                    className='spec__row'
                    style={{ display: product.boja === '/' ? 'none' : 'flex' }}
                  >
                    <div className='spec__name'>Boja</div>
                    <div className='spec__value'>
                      {Array.isArray(product.boja)
                        ? product.boja[dimensionChosen]
                        : product.boja}
                    </div>
                  </div>
                  <div
                    className='spec__row'
                    style={{
                      display: product.tehnicki_crtez === '/' ? 'none' : 'flex',
                    }}
                  >
                    <div className='spec__name'>Tehnicki crtež</div>
                    <div className='spec__value'>
                      {Array.isArray(product.tehnicki_crtez)
                        ? product.tehnicki_crtez[dimensionChosen]
                        : product.tehnicki_crtez}
                    </div>
                  </div>
                  <div
                    className='spec__row'
                    style={{
                      display: product.tip_otpornosti === '/' ? 'none' : 'flex',
                    }}
                  >
                    <div className='spec__name'>Tip otpornosti</div>
                    <div className='spec__value'>
                      {Array.isArray(product.tip_otpornosti)
                        ? product.tip_otpornosti[dimensionChosen]
                        : product.tip_otpornosti}
                    </div>
                  </div>
                  <div
                    className='spec__row'
                    style={{
                      display: product.garancija === '/' ? 'none' : 'flex',
                    }}
                  >
                    <div className='spec__name'>Garancija</div>
                    <div className='spec__value'>
                      {Array.isArray(product.garancija)
                        ? product.garancija[dimensionChosen]
                        : product.garancija}
                    </div>
                  </div>
                  <div
                    className='spec__row'
                    style={{
                      display: product.rok_trajanja === '/' ? 'none' : 'flex',
                    }}
                  >
                    <div className='spec__name'>Rok trajanja</div>
                    <div className='spec__value'>
                      {Array.isArray(product.rok_trajanja)
                        ? product.rok_trajanja[dimensionChosen]
                        : product.rok_trajanja}
                    </div>
                  </div>
                  <div
                    className='spec__row'
                    style={{
                      display: product.sertifikat === '/' ? 'none' : 'flex',
                    }}
                  >
                    <div className='spec__name'>Sertifikat</div>
                    <div className='spec__value'>
                      {Array.isArray(product.sertifikat)
                        ? product.sertifikat[dimensionChosen]
                        : product.sertifikat}
                    </div>
                  </div>
                  <div
                    className='spec__row'
                    style={{
                      display:
                        product.mesto_i_nacin_skladistenja === '/'
                          ? 'none'
                          : 'flex',
                    }}
                  >
                    <div className='spec__name'>Mesto i način skladištenja</div>
                    <div className='spec__value'>
                      {Array.isArray(product.mesto_i_nacin_skladistenja)
                        ? product.mesto_i_nacin_skladistenja[dimensionChosen]
                        : product.mesto_i_nacin_skladistenja}
                    </div>
                  </div>
                  <div
                    className='spec__row'
                    style={{
                      display:
                        product.dimenzije_pakovanja === '/' ? 'none' : 'flex',
                    }}
                  >
                    <div className='spec__name'>Dimenzije pakovanja</div>
                    <div className='spec__value'>
                      {Array.isArray(product.dimenzije_pakovanja)
                        ? product.dimenzije_pakovanja[dimensionChosen]
                        : product.dimenzije_pakovanja}
                    </div>
                  </div>
                  {/* <div
                    className='spec__row'
                    style={{
                      display:
                        product.prateca_oprema_dodaci === '/' ? 'none' : 'flex',
                    }}
                  >
                    <div className='spec__name'>Prateca oprema, dodaci</div>
                    <div className='spec__value'>
                      {Array.isArray(product.prateca_oprema_dodaci)
                        ? product.prateca_oprema_dodaci[dimensionChosen]
                        : product.prateca_oprema_dodaci}
                    </div>
                  </div> */}
                  <div
                    className='spec__row'
                    style={{
                      display:
                        product.dodatne_napomene === '/' ? 'none' : 'flex',
                    }}
                  >
                    <div className='spec__name'>Dodatne napomene</div>
                    <div className='spec__value'>
                      {Array.isArray(product.dodatne_napomene)
                        ? product.dodatne_napomene[dimensionChosen]
                        : product.dodatne_napomene}
                    </div>
                  </div>
                </div>
                <div className='spec__disclaimer'>
                  Sve informacije o tehničkim karakteristikama i izgledu
                  artikala su zasnovane na najnovijim podacima dostupnim u
                  trenutku objavljivanja. Stoga, ne možemo uvek garantovati
                  potpunost i tačnost svih datih informacija.
                </div>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      key: '2',
      label: <label>Mesta primene</label>,
      children: (
        <>
          <div className='product-tabs__content'>
            <div className='product-tabs__pane' id='tab-specification'>
              <div className='spec'>
                <h3 className='spec__header'>Uputstvo</h3>
                <div className='spec__section'>
                  <h4 className='spec__section-title'>Primena</h4>
                  <div className='spec__row'>
                    <div className='spec__name'>Mesto</div>
                    <div className='spec__value'>{product.mesta_primene}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      key: '3',
      label: <label>Način ugradnje</label>,
      children: (
        <>
          <div className='product-tabs__content'>
            <div className='product-tabs__pane' id='tab-specification'>
              <div className='spec'>
                <h3 className='spec__header'>Uputstvo</h3>
                <div className='spec__section'>
                  <h4 className='spec__section-title'>Način</h4>
                  <div className='spec__row'>
                    <div className='spec__name'>Ugradnja</div>
                    <div className='spec__value'>{product.nacin_ugradnje}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ),
    },
  ];

  useEffect(() => {
    const SelectedImgs = document.querySelectorAll('.divProductImg');
    SelectedImgs.forEach((img, index) => {
      // const index = img?.parentElement?.getAttribute('data-index') as any;
      // const childIndex =  img.getAttribute('data-index') as any;
      //console.log("first",dimensionChosen, index, SelectedImgs)
      if (dimensionChosen !== index)
        img.classList.remove('divProductImgSelectedThumbnail');
      img.parentElement!.classList.remove('divProductImgSelectedThumbnail');
    })
  }, [dimensionChosen])
  const slides = Array.isArray(product.slike) ? product.slike.map((img: any, index: number) => { return { src: `${baseApi}/assets/products/` + img + '.webp' } }) :
    [{ src: `${baseApi}/assets/products/` + zoomImagePath + '.webp' }]

  // share button dropdown props;

  const shareButtonItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a
          target='_blank'
          rel='noopener noreferrer'
          href={'viber://forward?text=' + encodeURIComponent("Pogledaj detalje ovog proizvoda na sajtu grometa" + " " + window.location.href)}
        >
          <img className='imgShareButtonDropDownIcon' src={icon_viber}></img>
          Viber
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a
          target='_blank'
          rel='noopener noreferrer'
          href={'https://www.facebook.com/sharer/sharer.php?u=' + (window.location.href)}
        >
          <img className='imgShareButtonDropDownIcon' src={icon_facebook}></img>
          Facebook
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a
          target='_blank'
          rel='noopener noreferrer'
          href={'fb-messenger://share/?link= ' + (window.location.href)}
        >
          <img
            className='imgShareButtonDropDownIcon'
            src={icon_messenger}
          ></img>
          Messenger
        </a>
      ),
    },
    // {
    //   key: '4',
    //   label: (
    //     <a
    //       target='_blank'
    //       rel='noopener noreferrer'
    //       href='https://www.luohanacademy.com'
    //     >
    //       <img
    //         className='imgShareButtonDropDownIcon'
    //         src={icon_instagram}
    //       ></img>
    //       Instagram
    //     </a>
    //   ),
    // },
    {
      key: '4',
      label: (
        <a
          target='_blank'
          rel='noopener noreferrer'
          href={`mailto:?subject=${product?.naziv_artikla}&body=Pogledaj detalje ovog proizvoda na sajtu grometa` + window.location.href}
        >
          <img className='imgShareButtonDropDownIcon' src={icon_email}></img>
          Email
        </a>
      ),
    },
    {
      key: '6',
      label: (
        <a
          target='_blank'
          rel='noopener noreferrer'
          onClick={() => CopyToClipboard(window?.location.href)}
        >
          <img className='imgShareButtonDropDownIcon' src={icon_copy}></img>
          Kopiraj link
        </a>
      ),
    },
  ];

  const handleShopRedirect = () => {
    const hasSubcategories = composite_categories.map(cat => cat.toLowerCase()).includes(product.kategorija_artikla.toLowerCase());
    //console.log("handle shop redirect", product.kategorija_artikla, composite_categories);
    if (hasSubcategories) {
      const subcategoryIndex = composite_categories.map(cat => cat.toLowerCase()).indexOf(product.kategorija_artikla.toLowerCase());
      const subcategories = subCategoryLocalStorageList[subcategoryIndex];

      localStorage.setItem('potkategorije', subcategories);
      //console.log("subcats", subcategories, product.kategorija_artikla + subcategories.toString());
    }
    setTimeout(() => {
      window.location.href = `/proizvodi#filteri=${product?.kategorija_artikla}&stranica=1`
    }, 300);
  }

  return (
    <div className='singleProductPageContainer container'>
      <Helmet>
        <title>{product?.naziv_artikla}</title>
        <meta name="description" content={product.meta_description} />
        <meta property="og:image" content={`${baseApi}/assets/products/` + zoomImagePath + '.webp'} />
      </Helmet>
      {/* { openPhotoSwipe &&  */}
      {product && product.slike && <Lightbox
        animation={{ swipe: 0, zoom: 3 }}
        open={openPhotoSwipe}
        close={() => setOpenPhotoSwipe(false)}
        carousel={{ preload: 1, finite: true }}
        slides={
          Array.isArray(product.slike) && !product.slike[0].includes(',') ?
            [{ src: (ref1?.current?.childNodes[0].childNodes[0] as any)?.src }, ...product.slike.map((img: any, index: number) => { return { src: '${baseApi}/assets/products/' + img + '.webp' } })]
            : Array.isArray(product.slike) && product.slike[0].includes(',') ? product.slike.map(item => { return item.split(',').map(subitem => { return { src: `${baseApi}/assets/products/` + subitem + '.webp' } }) }).flat()
              : !Array.isArray(product.slike) && product?.slike && product?.slike?.includes(',') ?
                [...product?.slike?.split(',').map((img: any, index: number) => { return { src: `${baseApi}/assets/products/` + img + '.webp' } })]
                :
                [{ src: `${baseApi}/assets/products/` + zoomImagePath + '.webp' }]

        }
        plugins={[Counter, Slideshow, Zoom, Thumbnails]}
        zoom={{ ref: zoomRef, zoomInMultiplier: 10, scrollToZoom: true }}
        thumbnails={{
          ref: thumbnailsRef,
          position: 'bottom',
          width: 80,
          height: 120,
          border: 1,
          borderRadius: 4,
          padding: 4,
          gap: 16,
          showToggle: false,
        }}
        slideshow={{ autoplay: false }}
        on={{
          click: () => {

          },
        }}
      />}

      {!openPhotoSwipe && (
        <>
          <div className='productPageProductContainer'>
            {/* left side of product page top level section */}
            <div className='divProductContainer'>

              <div className='divProductImgSelected' ref={ref1}>
                <LazyLoadImage
                  effect='blur'
                  id={'productShowcaseImage'}
                  onClick={() => {
                    hideBackToTop(true);
                    setOpenPhotoSwipe(true);
                  }}
                  alt={product?.naziv_artikla}
                  src={Array.isArray(product?.slike) ? `${baseApi}/assets/products/` + getImagePath(product, dimensionChosen) + '.webp' : imageSrc}
                  onContextMenu={() => { return false }}
                />
              </div>

              <div className='small-products-images divSmallProductImagesModelViseSlika'>
                {product?.model_vise_slika === "TRUE" && Array.isArray(product.slike) &&

                  product.slike.map((imageCVS) => {
                    //console.log("IMAGECVS:", imageCVS)
                    return imageCVS.split(',').map((slike: string, index) => {
                      return (
                        <div
                          key={slike + index}
                          id={slike + index}
                          data-index={index}
                          className={`divProductImg ${index === dimensionChosen ? 'divProductImgSelectedThumbnail' : ''
                            }`}
                          onClick={(e) => {
                            handleProductImgThumbnailSelected(e.target);
                          }}
                        >
                          <LazyLoadImage
                            effect='blur'
                            alt={product?.naziv_artikla}
                            src={
                              `${baseApi}/assets/products/` +
                              getImagePath({ ...product, slike: slike } as Product, index) +
                              '.webp'
                            }
                          />
                        </div>
                      );
                    })
                  })
                }

                {/* not array and no comma seperated values => grab base img */}
                {(product?.model_vise_slika !== "TRUE") && !Array.isArray(product?.slike) && product?.slike && !product?.slike?.includes(',') && (
                  <div className='divProductImg divProductImgSelectedThumbnail' style={{ border: "2px solid #004d8c" }}>
                    <LazyLoadImage
                      effect='blur'
                      onClick={() => { }}
                      alt={product?.naziv_artikla}
                      src={imageSrc}
                      onContextMenu={() => { return false }}
                    />
                  </div>
                )}
                {/* not array and HAS comma seperated values => split ',' and get imagePaths */}
                {product?.model_vise_slika !== "TRUE" && !Array.isArray(product?.slike) && product?.slike?.includes(',') &&
                  product?.slike?.split(',').map((slike: string, index) => {
                    return (
                      <div
                        key={slike + index}
                        id={slike + index}
                        data-index={index}
                        className={`divProductImg ${index === dimensionChosen ? 'divProductImgSelectedThumbnail' : ''
                          }`}
                        onClick={(e) => {
                          handleProductImgThumbnailSelected(e.target);
                        }}
                      >
                        <LazyLoadImage
                          effect='blur'
                          alt={product?.naziv_artikla}
                          src={
                            `${baseApi}/assets/products/` +
                            getImagePath(product as Product, index) +
                            '.webp'
                          }
                        />
                      </div>
                    );
                  })}
                {/* HAS array of product pictures => map each one to a small img div and get img path*/}
                {product?.model_vise_slika !== "TRUE" && Array.isArray(product.slike) &&
                  product.slike.map((slike: string, index) => {
                    return (
                      <div
                        key={slike + index}
                        id={slike + index}
                        data-index={index}
                        className={`divProductImg ${index === dimensionChosen ? 'divProductImgSelectedThumbnail' : ''
                          }`}
                        onClick={(e) => {
                          handleProductImgThumbnailSelected(e.target);
                        }}
                      >
                        <LazyLoadImage
                          effect='blur'
                          alt={product?.naziv_artikla}
                          src={
                            `${baseApi}/assets/products/` +
                            getImagePath(product as Product, index) +
                            '.webp'
                          }
                        />
                      </div>
                    );
                  })}

              </div>
            </div>

            {/* right side of product page top level section */}
            <div className='productPageDescriptionContainer'>
              <div className='productPageDescription'>
                <div className='productPageShareIconLabel'>
                  <Dropdown
                    menu={{ items: window.innerWidth > 1000 ? [...shareButtonItems.filter(el => el?.key !== '3')] : [...shareButtonItems] }}
                    placement='bottom'
                    arrow
                    open={showShare}
                  >
                    <button
                      className='productPageShareIconLabelButton'
                      onClick={() => setShowShare(!showShare)}
                    >
                      Podeli
                      <LazyLoadImage
                        effect='blur'
                        className='productPageShareIcon'
                        src='https://www.freeiconspng.com/thumbs/www-icon/vector-illustration-of-simple-share-icon--public-domain-vectors-23.png'
                      />
                    </button>
                  </Dropdown>
                </div>
                <h1>{product.naziv_artikla}</h1>

                <span className='singleProductPageDescription' style={{ marginBottom: "20px" }}>
                  Kategorija: <a style={{ marginLeft: "5px" }} onClick={() => { handleShopRedirect() }}>{product?.kategorija_artikla}</a>
                </span>
                <div>
                  <span
                    className='singleProductPageDescription'
                    style={{
                      display:

                        Array.isArray(product.meta_description) ? 'flex' : product?.meta_description?.length > 10
                          ? 'flex'
                          : 'none',
                    }}
                  >
                    {Array.isArray(product.meta_description)
                      ? product.meta_description[dimensionChosen]
                      : product.meta_description}
                  </span>
                  {product?.prosireni_opis?.length && (
                    <>
                      <br />
                    </>
                  )}
                  <span
                    className='singleProductPageDescription'
                    style={{
                      display:
                        Array.isArray(product.prosireni_opis) || (!Array.isArray(product.prosireni_opis) && product?.prosireni_opis?.length > 10) ? 'flex' : 'none',
                    }}
                  >
                    {Array.isArray(product.prosireni_opis)
                      ? product.prosireni_opis[dimensionChosen]
                      : product.prosireni_opis}
                    {/* {product.prosireni_opis} */}
                  </span>
                  <a className='aTagScrollToSpecifications' style={{ cursor: "pointer" }} onClick={() => executeScroll()}>Saznaj više o proizvodu</a>
                  <ul className='product__meta'>
                    <li className='product__meta-availability'>
                      Šifra artikla:
                      <span className='text-success'>
                        {Array.isArray(product.sifra_proizvoda)
                          ? product.sifra_proizvoda[dimensionChosen]
                          : product.sifra_proizvoda}
                      </span>
                    </li>
                    <li style={{ textAlign: 'right' }}>
                      Minimalno pakovanje:{' '}
                      {Array.isArray(product.minimalno_pakovanje)
                        ? product.minimalno_pakovanje[dimensionChosen]
                        : product.minimalno_pakovanje}
                    </li>
                    <li>Jedinica mere: {Array.isArray(product.jedinica_mere)
                      ? product.jedinica_mere[dimensionChosen]
                      : product.jedinica_mere}</li>
                    <li style={{ textAlign: 'right' }}>
                      Transportno pakovanje:{' '}
                      {Array.isArray(product.transportno_pakovanje)
                        ? product.transportno_pakovanje[dimensionChosen]
                        : product.transportno_pakovanje}
                    </li>
                  </ul>
                  {product?.naziv_proizvoda_model !== '/' && (
                    <>
                      <br></br>
                      <label
                        style={{
                          paddingBottom: '10px',
                          display: 'inline-block',
                          textTransform: 'uppercase',
                          fontWeight: '600',
                        }}
                      >
                        Model:
                      </label>
                      <Row>
                        {product?.naziv_proizvoda_model && <Radio.Group
                          onChange={(e) => setDimensionIndex(e)}
                          defaultValue={product.sifra_proizvoda.indexOf(window.location.hash.substring(1)) !== -1 ? product.sifra_proizvoda[dimensionChosen] : 0}
                          value={dimensionChosen}
                          buttonStyle='solid'
                          style={{ borderRadius: '0px !important' }}
                        >
                          {product.naziv_proizvoda_model &&
                            Array.isArray(product.naziv_proizvoda_model) ? (
                            product.naziv_proizvoda_model.map(
                              (dimension, index) => {
                                const longest = Math.max(...(product.naziv_proizvoda_model as Array<string>).map(el => el.length));
                                return <Radio.Button
                                  id={index.toString()}
                                  key={index}
                                  style={{
                                    borderRadius: '0px !important',
                                    marginRight: '5px',
                                    marginBottom: '5px',
                                    backgroundColor: '#f0f0f0',
                                    width: longest && longest > 20 ?
                                      "190px"
                                      : longest && longest > 15 ?
                                        "189px"
                                        : longest && longest > 10 ?
                                          "150px"
                                          : longest && longest > 5 ?
                                            "120px"
                                            : "70px"
                                  }}
                                  value={index}
                                >
                                  {dimension}
                                </Radio.Button>
                              }
                            )
                          ) : (
                            <>
                              <Radio.Button
                                style={{
                                  borderRadius: '0px !important',
                                  backgroundColor: '#f0f0f0',
                                }}
                                value='0'
                              >
                                {product.naziv_proizvoda_model}
                              </Radio.Button>
                            </>
                          )}
                        </Radio.Group>}
                      </Row>
                      <br />
                    </>
                  )}

                  <div
                    className='divAdditionalDescription'
                    style={{ borderTop: '0px' }}
                  >

                  </div>

                  <div className='divProductActionButtons'>
                    <label className='labelHowToOrder'>Za pravna lica</label>
                    <div className='divHowToOrderButtons'>
                      <Button
                        className='divProductActionQuantity'
                        onClick={() => {
                          setShowFirmTip(() => !showFirmTip);
                          setShowPersonTip(false);
                          setShowShipmentTip(false);
                        }}
                      >
                        <div className='divProductActionQuantityText' style={{ backgroundColor: showFirmTip ? "#004d8c" : '' }}>
                          PORUČITE
                        </div>
                      </Button>

                      <div
                        className='divShowFirmTip divResponsiveFirmTip'
                        style={
                          showFirmTip
                            ? { borderColor: '#9a9a9a', color: '#000' }
                            : {}
                        }
                        hidden={!showFirmTip || showPersonTip}
                      >
                        <ul>
                          <li>Pozovite 060/0768-777 ili pošaljite porudžbinu na  <a href="mailto:prodaja@gromet.rs"> prodaja@gromet.rs.</a></li>
                        </ul>
                      </div>

                      <Button
                        className="divProductActionQuantity divInfoPhysicalBtn"
                        onClick={() => {
                          setShowPersonTip(() => !showPersonTip);
                          setShowFirmTip(false);
                          setShowShipmentTip(false);
                        }}
                        style={{ fontSize: "16px" }}
                      >
                        <div className='divProductActionQuantityText'
                          style={{
                            background: 'white',
                            color: "#00AEEF",
                            whiteSpace: "normal",
                            wordBreak: "normal"
                          }}>
                          {/* showPersonTip ? "#004d8c" : '' */}
                          Informacije za fizička lica
                        </div>
                      </Button>
                      <div
                        className='divShowFirmTip divShowPhysicalPersonTip'
                        style={
                          showPersonTip
                            ? { borderColor: '#9a9a9a', color: '#000' }
                            : {}
                        }
                        hidden={!showPersonTip || showFirmTip}
                      >
                        <ul>
                          <li>Pozovite 060/0768-777 ili pošaljite mail
                            <a href="mailto:office@gromet.rs"> office@gromet.rs.</a> <br />
                            Dobićete informaciju gde se nalaze naši partneri najbliži Vama kod kojih možete kupiti naše proizvode.</li>
                        </ul>
                      </div>

                    </div>
                    <span
                      className='spanTroskoviIsporuke'
                      onClick={() => {
                        setShowShipmentTip(() => !showShipmentTip);
                        setShowFirmTip(false);
                        setShowPersonTip(false);
                      }}
                    >
                      Troškovi isporuke
                    </span>
                    <div
                      className={window.innerWidth > 900 ? 'divShowFirmTip spanShowShipmentTip' : "divShowFirmTip responsiveShipmentTip"}
                      style={
                        showShipmentTip
                          ? { borderColor: '#9a9a9a', color: '#000' }
                          : {}
                      }
                      hidden={!showShipmentTip || showFirmTip || showPersonTip}
                    >
                      <ul>
                        <li>1. BESPLATNA DOSTAVA našim vozilom za porudžbine preko 20 000 dinara+pdv ili dođite lično po robu u neki od naših magacina.</li>
                        <li>2. KURIRSKOM SLUŽBOM: <br />
                          -U našoj organizaciji-troškovi i način dostave zavise od gabarita i težine porudžbine. <br />
                          -U vašoj organizaciji-odaberite sami kurirsku službu za dostavu robe.<br />
                          Za detalje pozvati na 060/0768777
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                  </div>

                  {/* <span>Kolicina</span>
            <div className='divProductActionButtons'>
              <InputNumber className='divProductActionQuantity' min={1} controls={false} style={{textAlign: "center", justifyContent: "center", paddingLeft: "10px"}} addonBefore="-" addonAfter="+"  type={"number"} defaultValue={1}></InputNumber>
              <Button className='divProductActionQuantity' type='primary'>Dodaj u korpu</Button>
              <Tooltip title="Dodaj u omiljeno">
              <HeartFilled className='divProductActionIcon' ref={ref2} />
              </Tooltip>
              <Tooltip title="Dodaj u listu za poredjenje">
              <BarChartOutlined className='divProductActionIcon' ref={ref3}/>
              </Tooltip>
            </div> */}
                </div>
              </div>
            </div>

          </div>
          <div className='divProductTabsContainer' ref={myRef}>
            <Tabs defaultActiveKey='1' items={SpecifikacijeJSX} onChange={onChange} />
          </div>

          {/* featured products */}

          <div
            className='divFeaturedProductsContainer container'
            style={{ marginBottom: '20px', minHeight: '400px' }}
          >
            {/* horizontal scroll list */}
            <div
              className='block-header'
              style={{ width: '100%', height: '50px' }}
            >
              <h3 className='block-header__title'>Povezani Proizvodi</h3>
              <div className='block-header__divider'></div>
              <>
                <LeftOutlined id='btn-left' />
                <RightOutlined id='btn-right' />
              </>
            </div>
            <div className='divProductScrollContainer'>
              <Row style={{ width: '100%', flexWrap: 'nowrap' }}>
                {productsList.filter(productItem => productItem.kategorija_artikla === product.kategorija_artikla).slice(0, 20).map((product, index) => {
                  const imagePath = getImagePath(product as Product);
                  return (
                    <ProductCard
                      key={index}
                      product={product as Product}
                      picture={`${baseApi}/assets/products/` + imagePath + '.webp'} //pictures[index].picture}
                      hideSticker={true}
                    ></ProductCard>
                  );
                })}
              </Row>
            </div>
          </div>

          <div
            className='divFeaturedProductsContainer container'
            style={{ marginBottom: '20px', minHeight: '400px' }}
          >
            {/* horizontal scroll list */}
            <div
              className='block-header'
              style={{ width: '100%', height: '50px' }}
            >
              <h3 className='block-header__title'>Najprodavaniji Proizvodi</h3>
              <div className='block-header__divider'></div>
              <>
                <LeftOutlined id='btn-left2' />
                <RightOutlined id='btn-right2' />
              </>
            </div>
            <div className='divProductScrollContainer divProductScrollContainer2'>
              <Row style={{ width: '100%', flexWrap: 'nowrap' }}>
                {[...productsList]
                  .slice(0, 20)
                  .reverse()
                  .map((product, index) => {
                    const imagePath = getImagePath(product as Product);
                    return (
                      <ProductCard
                        key={index}
                        product={product as Product}
                        picture={`${baseApi}/assets/products/` + imagePath + '.webp'}
                      // pictures[pictures.length - 4 - 1 - (index % 9)].picture
                      ></ProductCard>
                    );
                  })}
              </Row>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductPage;
