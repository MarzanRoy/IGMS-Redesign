<template>
  <Teleport to="#modal">
    <Transition name="modal">
      <div v-show="isModalOpen" class="modal-bg">
        <Transition name="modal-inner">
          <div v-show="isModalOpen" class="modal" ref="modalRef" :style="customModalStyling">
            <button class="close-modal-btn" @click="$emit('closed')">X</button>
            <slot />
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

export default {
  name: "PopupModal",
  emits: ["closed"],
  props: {
    isModalOpen: {
      type: Boolean,
      default: false,
    },
    customModalStyling: {
      type: String,
      default: "",
    },
  },
  setup() {
    const modalRef = ref(null);
    return {
      modalRef,
    };
  },
  mounted() {
    // close modal when pressing escape
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isModalOpen) {
        this.$emit("closed");
      }
    });

    // close modal when clicking outside by emitting to close the modal
    onClickOutside(this.modalRef, () => {
      this.$emit("closed");
    });
  },
  beforeUnmount() {
    // remove event listeners
    window.removeEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isModalOpen) {
        this.$emit("closed");
      }
    });
    document.body.style.overflow = "auto";
  },
  watch: {
    isModalOpen(newVal) {
      if (newVal) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    },
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  transform: scale(0.9);
  opacity: 0;
}

.modal-inner-leave-to {
  transform: scale(0.9);
}

.modal .close-modal-btn {
  /* position the button */
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 14px;
  padding: 0;
  /* remove default styles */
  color: inherit;
  transition: all 0.2s ease-in-out;
}

.modal .close-modal-btn:hover {
  outline: none;
  scale: 1.15;
  color: #878787;
}

.modal-bg {
  /* always fix our modal to the view port */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* darken the screen */
  background-color: rgba(0,0,0,0.5);
  /* center the modal */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
}

.modal {
  /* needed to position the button */
  position: relative;
  /* styling */
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 10px 5px 2px rgba(0, 0, 0, 0.2);
}
</style>