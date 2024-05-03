import {
  Page, Card, EmptyState
} from '@shopify/polaris';


export default function EmptyScreen() {
  return (
    <Page>
      <Card>
        <EmptyState
          heading="Configure your automation"
          action={{
            content: 'Start with Automations',
            url: '/app/wizard/1'
          }}
          secondaryAction={{
            content: 'Talk To Sales and Support',
            target: '_blank',
            url: 'https://www.loadingplay.com/',
          }}
          image="/empty.png"
        >
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mattis justo non ligula laoreet, sed viverra ex faucibus. Donec id egestas nunc. Nullam dignissim, lectus.</p>
        </EmptyState>
      </Card>
    </Page>
  )
}
