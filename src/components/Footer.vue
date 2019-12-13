<template>
  <div class="footer">
    <div class="footer-item">© Data Mechanics 2019</div>
    <div class="footer-item">
      <a href="mailto:contact@datamechanics.co" class="footer-link">contact@datamechanics.co</a>
    </div>
    <div class="footer-item">
      Phone: &nbsp; &nbsp;
      <a href="tel:+14159644647" class="footer-link">+1 415 964 4647</a> / 
      <a href="tel:+33766209818" class="footer-link">+ 33 7 66 20 98 18</a><br>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="less">
@import '~@/assets/less/variables';

.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .footer-item {
    margin: 8px 0;
  }
  .footer-link {
    color: @secondary_color;
    &:hover {
      text-decoration: underline;
      color: @primary_color;
    }
  }
}
</style>