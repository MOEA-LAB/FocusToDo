import matplotlib.pyplot as plt
import numpy as np
from matplotlib.font_manager import FontProperties

# 设置中文字体
font = FontProperties(fname='./SmileySans-Oblique.ttf', size=12)

# 模拟问卷调查结果
gender = ['male', 'female']
gender_count = [55, 45]

age_group = ['< 18', '18-25', '26-35', '36-45', '> 46']
age_count = [5, 60, 21, 7, 7]

usage_frequency = ['multiple times', 'one time', 'seldom', 'never']
usage_count = [90, 3, 0, 0]

willing_to_try = ['yes', 'no']
willing_count = [95,5]

device_usage_time = ['< 1h', '1-2h', '2-4h', '4-6h', '>6h']
device_count = [10, 20, 30, 25, 15]

device_usage_purpose = ['work', 'study', 'amusement', 'others']
purpose_count = [20, 35, 45, 10]

# 绘制柱形图
plt.figure(figsize=(10, 6))

# 性别分布
plt.subplot(231)
plt.bar(gender, gender_count)
plt.title('性别分布', fontproperties=font)

# 年龄分布
plt.subplot(232)
plt.bar(age_group, age_count)
plt.title('年龄分布', fontproperties=font)

# 使用频率
plt.subplot(233)
plt.bar(device_usage_time, device_count)
plt.title('手机使用时间/天', fontproperties=font)

# 是否愿意尝试
plt.subplot(234)
plt.bar(usage_frequency, usage_count)
plt.title('微信使用频率/天', fontproperties=font)

# 设备使用时间
plt.subplot(235)
plt.bar(device_usage_purpose, purpose_count)
plt.title('手机使用目的', fontproperties=font)

# 设备使用目的
plt.subplot(236)
plt.bar(willing_to_try, willing_count)
plt.title('是否愿意尝试FocusToDo', fontproperties=font)


plt.tight_layout()
plt.show()

