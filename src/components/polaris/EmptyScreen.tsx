import {
  Page, Card, EmptyState
} from '@shopify/polaris';


export default function EmptyScreen() {
  return (
    <Page>
      <Card>
        <EmptyState
          heading="Configura tu automatización"
          action={{
            content: 'Comienza con las automatizaciones',
            url: '/app/wizard/1'
          }}
          secondaryAction={{
            content: 'Hablar con Soporte/Ventas',
            target: '_blank',
            url: 'https://www.loadingplay.com/',
          }}
          image="/empty.png"
        >
          <p>Te guiaremos paso a paso para que puedas configurar tu automatización.</p>
        </EmptyState>
      </Card>
    </Page>
  )
}
