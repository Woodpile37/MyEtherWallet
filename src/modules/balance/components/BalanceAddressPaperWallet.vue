<template>
  <mew-overlay
    :footer="{
      text: 'Need help?',
      linkTitle: 'Contact support',
      link: 'mailto:support@myetherwallet.com'
    }"
    color-type="white"
    :show-overlay="isOverlayOpen"
    title="My paper wallet"
    content-size="xlarge"
    :close="close"
    @closeOverlay="close"
  >
    <!--
          ===============================================
          Printable paper wallet content
          ===============================================
          -->
    <div ref="printContainer" class="printable-wallet">
      <paper-wallet-to-print />
    </div>

    <!--
          ===============================================
          Paper wallet to show
          ===============================================
          -->
    <paper-wallet-to-display />

    <div class="d-flex justify-center mt-12">
      <mew-button title="Print" btn-size="xlarge" @click.native="print" />
    </div>
  </mew-overlay>
</template>

<script>
import PaperWalletToPrint from './PaperWalletToPrint';
import PaperWalletToDisplay from './PaperWalletToDisplay';
import printJS from 'print-js';
import html2canvas from 'html2canvas';
import { Toast, ERROR } from '@/modules/toast/handler/handlerToast';

export default {
  name: 'BalanceAddressPaperWallet',
  components: {
    PaperWalletToPrint,
    PaperWalletToDisplay
  },
  props: {
    open: { default: false, type: Boolean },
    close: {
      default: function () {
        return {};
      },
      type: Function
    }
  },
  computed: {
    isOverlayOpen() {
      return this.open;
    }
  },
  watch: {
    isOverlayOpen(val) {
      if (val === false) {
        this.$emit('close');
      }
    }
  },
  methods: {
    async print() {
      try {
        const element = this.$refs.printContainer;
        const screen = await html2canvas(element, {
          async: true,
          logging: false
        }).then(canvas => {
          return canvas;
        });
        if (screen && screen.toDataURL !== '') {
          printJS({
            printable: screen.toDataURL('image/png'),
            type: 'image',
            onError: () => {
              Toast(this.$t('errorsGlobal.print-support-error'), ERROR);
            }
          });
        } else {
          Toast(this.$t('errorsGlobal.print-support-error'), ERROR);
        }
      } catch (e) {
        Toast(e, ERROR);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.printable-wallet {
  position: fixed;
  top: -3000px;
  left: -3000px;
  z-index: -1;
}
</style>
