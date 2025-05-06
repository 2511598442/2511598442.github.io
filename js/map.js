document.addEventListener('DOMContentLoaded', function() {
  const states = {
    ca: {
      title: '加州仓库',
      content: '15万平方英尺｜洛杉矶/旧金山/圣地亚哥｜日处理量5000+票',
      coordinates: [34.0522, -118.2437]
    },
    ga: {
      title: '乔治亚州中心',
      content: '10万平方英尺｜亚特兰大枢纽｜全美48小时达',
      coordinates: [33.7490, -84.3880]
    },
    nj: {
      title: '新泽西枢纽',
      content: '8万平方英尺｜纽约港对接｜东海岸核心仓',
      coordinates: [40.7128, -74.0060]
    }
  };

  // 绑定州路径交互
  document.querySelectorAll('.state-path').forEach(path => {
    path.addEventListener('mouseenter', function(e) {
      this.style.filter = 'url(#highlight) opacity(1)';
      const stateId = this.id.replace('-path','');
      showStateInfo(states[stateId]);
    });

    path.addEventListener('mouseleave', function() {
      this.style.filter = 'opacity(0.7)';
      $('#stateModal').modal('hide');
    });
  });

  function showStateInfo(data) {
    document.getElementById('stateTitle').textContent = data.title;
    document.getElementById('stateContent').textContent = data.content;
    $('#stateModal').modal('show');
  }
});