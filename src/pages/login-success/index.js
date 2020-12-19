// @ts-nocheck
import I18nProvider from 'next-translate/I18nProvider'
import React from 'react'
import C from '../../../src/_pages/login-success'

export default function Page({ _ns, _lang, ...p }){
  return (
    <I18nProvider
      lang={_lang}
      namespaces={_ns}  
      
    >
      <C {...p} />
    </I18nProvider>
  )
}

Page = Object.assign(Page, { ...C })




export const getStaticProps = async ctx => {
    const _lang = ctx.locale || ctx.router?.locale || 'en'
  
  const _ns = {  }
  
    let res = {}
    if(typeof res.then === 'function') res = await res
  
    return { 
      ...res, 
      props: {
        ...(res.props || {}),
        _ns,
        _lang,
      }
    }
  }



